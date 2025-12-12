import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, ShoppingBag, User, LogOut, RotateCcw, Upload, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const RETURN_REASONS = [
  "Defective / not working",
  "Damaged packaging / box issue",
  "Arrived damaged",
  "Missing parts",
  "Wrong item received",
  "Not as described",
  "Changed my mind",
  "Other",
];

const Account = () => {
  const [formData, setFormData] = useState({
    orderNumber: "",
    email: "",
    fullName: "",
    returnReason: "",
    preferredResolution: "",
    additionalDetails: "",
    confirmed: false,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [returnRequestId, setReturnRequestId] = useState("");
  const lastSubmitRef = useRef<number>(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const generateReturnId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "RR-";
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "video/mp4"];
      return validTypes.includes(file.type);
    });

    if (validFiles.length + files.length > 3) {
      toast.error("Maximum 3 files allowed");
      return;
    }

    setFiles((prev) => [...prev, ...validFiles].slice(0, 3));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypotRef.current?.value) {
      return;
    }

    // Rate limiting - 60 seconds
    const now = Date.now();
    if (now - lastSubmitRef.current < 60000) {
      toast.error("Please wait 60 seconds before submitting again");
      return;
    }

    // Validation
    if (!formData.orderNumber || !formData.email || !formData.fullName) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.returnReason) {
      toast.error("Please select a return reason");
      return;
    }

    if (!formData.preferredResolution) {
      toast.error("Please select your preferred resolution");
      return;
    }

    if (formData.additionalDetails.length < 20) {
      toast.error("Additional details must be at least 20 characters");
      return;
    }

    if (!formData.confirmed) {
      toast.error("Please confirm your order details are correct");
      return;
    }

    setIsSubmitting(true);
    lastSubmitRef.current = now;

    const newReturnId = generateReturnId();

    try {
      const { error } = await supabase.from("return_requests").insert({
        request_id: newReturnId,
        order_number: formData.orderNumber,
        email: formData.email,
        full_name: formData.fullName,
        return_reason: formData.returnReason,
        preferred_resolution: formData.preferredResolution,
        additional_details: formData.additionalDetails,
      });

      if (error) {
        console.error("Error submitting return request:", error);
        toast.error("Failed to submit return request. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setReturnRequestId(newReturnId);
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Error submitting return request:", err);
      toast.error("Failed to submit return request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToReturns = () => {
    document.getElementById("returns")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Manage your orders and explore our products from your personal dashboard.
            </p>
          </div>

          {/* Action Cards - 3 column grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Order Tracking Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Track My Order</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  Check the status and delivery updates for your recent orders.
                </p>
                <Button asChild className="w-full">
                  <Link to="/track-order">
                    <Package className="w-4 h-4 mr-2" />
                    ORDER TRACKING
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Shop Now Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Continue Shopping</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  Explore our products and discover the relief you deserve.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    SHOP NOW
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Start a Return Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RotateCcw className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-xl">Start a Return</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  Submit a return request using your order number and email address.
                </p>
                <Button variant="outline" className="w-full" onClick={scrollToReturns}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  START A RETURN
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Returns Section */}
          <section id="returns" className="mt-16 scroll-mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Start a Return Request</h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                No account creation required. Enter your order details and we'll review your request within 24–48 hours.
              </p>
            </div>

            <Card className="max-w-[720px] mx-auto">
              <CardContent className="pt-6">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Return Request Submitted
                    </h3>
                    <p className="text-lg font-mono text-primary mb-2">
                      Return Request ID: {returnRequestId}
                    </p>
                    <p className="text-muted-foreground">
                      We'll review and contact you within 24–48 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => {
                        setSubmitSuccess(false);
                        setFormData({
                          orderNumber: "",
                          email: "",
                          fullName: "",
                          returnReason: "",
                          preferredResolution: "",
                          additionalDetails: "",
                          confirmed: false,
                        });
                        setFiles([]);
                      }}
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field */}
                    <input
                      type="text"
                      ref={honeypotRef}
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute opacity-0 h-0 w-0 pointer-events-none"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="orderNumber">Order Number *</Label>
                        <Input
                          id="orderNumber"
                          placeholder="#1234"
                          value={formData.orderNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, orderNumber: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="returnReason">Return Reason *</Label>
                      <Select
                        value={formData.returnReason}
                        onValueChange={(value) =>
                          setFormData({ ...formData, returnReason: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          {RETURN_REASONS.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Preferred Resolution *</Label>
                      <RadioGroup
                        value={formData.preferredResolution}
                        onValueChange={(value) =>
                          setFormData({ ...formData, preferredResolution: value })
                        }
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="refund" id="refund" />
                          <Label htmlFor="refund" className="font-normal cursor-pointer">
                            Refund
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="replacement" id="replacement" />
                          <Label htmlFor="replacement" className="font-normal cursor-pointer">
                            Replacement
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalDetails">Additional Details * (min. 20 characters)</Label>
                      <Textarea
                        id="additionalDetails"
                        placeholder="Please describe your issue in detail..."
                        value={formData.additionalDetails}
                        onChange={(e) =>
                          setFormData({ ...formData, additionalDetails: e.target.value })
                        }
                        rows={4}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.additionalDetails.length}/20 characters minimum
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Photo/Video Upload (optional, max 3 files)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4">
                        <input
                          type="file"
                          id="fileUpload"
                          accept=".jpg,.jpeg,.png,.mp4"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="fileUpload"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">
                            Click to upload (jpg, png, mp4)
                          </span>
                        </label>
                      </div>
                      {files.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm"
                            >
                              <span className="truncate max-w-[150px]">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="confirmed"
                        checked={formData.confirmed}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, confirmed: checked === true })
                        }
                      />
                      <Label htmlFor="confirmed" className="font-normal text-sm cursor-pointer">
                        I confirm that the order number and email address are correct.
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "SUBMIT RETURN REQUEST"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Login Notice */}
          <div className="mt-10 p-6 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Need to access your Shopify account for billing or subscription details?
            </p>
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://shopify.com/97343734050/account"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Access Shopify Account
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
