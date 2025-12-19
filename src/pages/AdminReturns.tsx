import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { LogOut, RefreshCw, RotateCcw, Filter } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface ReturnRequest {
  id: string;
  request_id: string;
  order_number: string;
  email: string;
  full_name: string;
  return_reason: string;
  preferred_resolution: string;
  additional_details: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Beklemede", color: "bg-yellow-500" },
  { value: "approved", label: "Onaylandı", color: "bg-green-500" },
  { value: "rejected", label: "Reddedildi", color: "bg-red-500" },
  { value: "processing", label: "İşleniyor", color: "bg-blue-500" },
  { value: "completed", label: "Tamamlandı", color: "bg-gray-500" },
];

const AdminReturns = () => {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchReturns();
  }, [filterStatus]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin");
      toast.error("Admin yetkisi bulunamadı");
    }
  };

  const fetchReturns = async () => {
    setIsLoading(true);
    
    let query = supabase
      .from("return_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (filterStatus !== "all") {
      query = query.eq("status", filterStatus);
    }

    const { data, error } = await query;

    if (error) {
      toast.error("İade talepleri yüklenemedi");
    } else {
      setReturns(data || []);
    }

    setIsLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const request = returns.find((r) => r.id === id);
    
    const { error } = await supabase
      .from("return_requests")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast.error("Durum güncellenemedi");
      return;
    }

    // Send approval email if status changed to approved
    if (newStatus === "approved" && request) {
      try {
        const { error: emailError } = await supabase.functions.invoke("send-return-notification", {
          body: {
            type: "approved",
            requestId: request.request_id,
            orderNumber: request.order_number,
            email: request.email,
            fullName: request.full_name,
            returnReason: request.return_reason,
            preferredResolution: request.preferred_resolution,
            additionalDetails: request.additional_details,
          },
        });

        if (emailError) {
          toast.warning("Durum güncellendi ancak email gönderilemedi");
        } else {
          toast.success("Durum güncellendi ve onay emaili gönderildi");
        }
      } catch (err) {
        toast.warning("Durum güncellendi ancak email gönderilemedi");
      }
    } else {
      toast.success("Durum güncellendi");
    }

    fetchReturns();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const getStatusBadge = (status: string) => {
    const statusOption = STATUS_OPTIONS.find((s) => s.value === status);
    return (
      <Badge variant="secondary" className={`${statusOption?.color} text-white`}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">İade Talepleri Yönetimi</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış Yap
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Talep</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{returns.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Beklemede</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-600">
                {returns.filter((r) => r.status === "pending").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Onaylandı</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {returns.filter((r) => r.status === "approved").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tamamlandı</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-600">
                {returns.filter((r) => r.status === "completed").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={fetchReturns} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Yenile
          </Button>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Talep ID</TableHead>
                  <TableHead>Sipariş No</TableHead>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>Neden</TableHead>
                  <TableHead>Çözüm</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Yükleniyor...
                    </TableCell>
                  </TableRow>
                ) : returns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      İade talebi bulunamadı
                    </TableCell>
                  </TableRow>
                ) : (
                  returns.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono text-sm">{request.request_id}</TableCell>
                      <TableCell>{request.order_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.full_name}</p>
                          <p className="text-sm text-muted-foreground">{request.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate" title={request.return_reason}>
                        {request.return_reason}
                      </TableCell>
                      <TableCell className="capitalize">{request.preferred_resolution}</TableCell>
                      <TableCell className="text-sm">
                        {format(new Date(request.created_at), "d MMM yyyy HH:mm", { locale: tr })}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Select
                          value={request.status}
                          onValueChange={(value) => updateStatus(request.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminReturns;
