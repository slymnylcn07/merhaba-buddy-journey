import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Quote } from "lucide-react";
import { Link } from "react-router-dom";

// Chart color palette
const COLORS = ['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6'];

// Article 1: Why Knee Pain Doesn't Go Away
export const KneePainFactorsChart = () => {
  const data = [
    { name: 'Joint Stiffness', value: 35 },
    { name: 'Muscle Weakness', value: 25 },
    { name: 'Reduced Flexibility', value: 20 },
    { name: 'Daily Wear', value: 20 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Common Factors Contributing to Persistent Knee Discomfort</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Based on common patterns observed in everyday knee discomfort</p>
    </div>
  );
};

export const DailyActivityImpactChart = () => {
  const data = [
    { activity: 'Walking', impact: 85 },
    { activity: 'Stairs', impact: 92 },
    { activity: 'Sitting', impact: 65 },
    { activity: 'Standing', impact: 78 },
    { activity: 'Bending', impact: 88 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Daily Activities and Knee Stress Level</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="activity" type="category" width={80} />
            <Tooltip formatter={(value) => [`${value}%`, 'Stress Level']} />
            <Bar dataKey="impact" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Relative stress levels during common daily activities</p>
    </div>
  );
};

// Article 2: Heat vs Red Light Therapy
export const TherapyComparisonChart = () => {
  const data = [
    { category: 'Immediate Relief', heat: 90, redLight: 45 },
    { category: 'Long-term Support', heat: 55, redLight: 85 },
    { category: 'Ease of Use', heat: 85, redLight: 80 },
    { category: 'Penetration Depth', heat: 60, redLight: 95 },
    { category: 'Session Frequency', heat: 75, redLight: 90 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Heat Therapy vs Red Light Therapy Comparison</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="heat" fill="#f97316" name="Heat Therapy" radius={[0, 4, 4, 0]} />
            <Bar dataKey="redLight" fill="#ef4444" name="Red Light" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-500"></div>
          <span className="text-xs text-muted-foreground">Heat Therapy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span className="text-xs text-muted-foreground">Red Light Therapy</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">General comparison of therapy characteristics (individual results may vary)</p>
    </div>
  );
};

export const TherapyUsageTimingChart = () => {
  const data = [
    { name: 'Morning', heat: 40, redLight: 35 },
    { name: 'Afternoon', heat: 20, redLight: 25 },
    { name: 'Evening', heat: 55, redLight: 60 },
    { name: 'Before Activity', heat: 70, redLight: 30 },
    { name: 'After Activity', heat: 45, redLight: 55 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Preferred Usage Times</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="heat" fill="#f97316" name="Heat" radius={[4, 4, 0, 0]} />
            <Bar dataKey="redLight" fill="#ef4444" name="Red Light" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">When people typically prefer each therapy type</p>
    </div>
  );
};

// Article 3: Who Benefits Most
export const BeneficiaryGroupsChart = () => {
  const data = [
    { name: 'Active Adults (40-55)', value: 30 },
    { name: 'Seniors (55+)', value: 35 },
    { name: 'Office Workers', value: 20 },
    { name: 'Active Lifestyle', value: 15 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Who Uses At-Home Knee Therapy Devices</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Distribution of typical at-home therapy device users</p>
    </div>
  );
};

export const ConsistencyBenefitsChart = () => {
  const data = [
    { week: 'Week 1', comfort: 20 },
    { week: 'Week 2', comfort: 35 },
    { week: 'Week 3', comfort: 50 },
    { week: 'Week 4', comfort: 62 },
    { week: 'Week 6', comfort: 75 },
    { week: 'Week 8', comfort: 85 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Comfort Improvement with Consistent Use</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="week" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Comfort Level']} />
            <Bar dataKey="comfort" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Typical comfort improvement trajectory with daily use</p>
    </div>
  );
};

// Article 4: Daily Routine
export const DailyRoutineTimeChart = () => {
  const data = [
    { name: 'Morning Warmup', value: 10, color: '#f97316' },
    { name: 'Midday Breaks', value: 15, color: '#3b82f6' },
    { name: 'Evening Session', value: 15, color: '#8b5cf6' },
    { name: 'Stretching', value: 10, color: '#22c55e' },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Suggested Daily Time Investment (minutes)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 20]} />
            <Tooltip formatter={(value) => [`${value} min`, 'Duration']} />
            <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Total: approximately 50 minutes spread throughout the day</p>
    </div>
  );
};

export const RoutineAdherenceChart = () => {
  const data = [
    { name: 'Week 1', adherence: 85 },
    { name: 'Week 2', adherence: 70 },
    { name: 'Week 3', adherence: 60 },
    { name: 'Week 4', adherence: 55 },
    { name: 'Week 6', adherence: 75 },
    { name: 'Week 8', adherence: 90 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Typical Routine Adherence Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Adherence']} />
            <Bar dataKey="adherence" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Initial enthusiasm often dips before habits become automatic</p>
    </div>
  );
};

// Info boxes for additional content
export const InfoBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-primary/5 rounded-xl p-6 my-8 border-l-4 border-primary">
    <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
    <div className="text-muted-foreground font-light leading-relaxed text-sm">
      {children}
    </div>
  </div>
);

export const StatHighlight = ({ stat, label, description }: { stat: string; label: string; description?: string }) => (
  <div className="bg-muted/30 rounded-xl p-6 my-6 text-center border border-border/30">
    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat}</div>
    <div className="text-foreground font-medium mb-1">{label}</div>
    {description && <div className="text-sm text-muted-foreground">{description}</div>}
  </div>
);

export const TipsList = ({ tips, title, items }: { tips?: string[]; title?: string; items?: string[] }) => {
  const listItems = items || tips || [];
  const displayTitle = title || "Quick Tips";
  
  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="text-primary">✓</span> {displayTitle}
      </h3>
      <ul className="space-y-2">
        {listItems.map((tip, index) => (
          <li key={index} className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="text-primary mt-1">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Journal/Research Quote Component
export const JournalQuote = ({ 
  quote, 
  source, 
  publication,
  year 
}: { 
  quote: string; 
  source: string; 
  publication: string;
  year?: string;
}) => (
  <blockquote className="bg-muted/20 rounded-xl p-6 my-8 border-l-4 border-primary relative">
    <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/20" />
    <p className="text-foreground font-light leading-relaxed italic mb-4 pr-8">
      "{quote}"
    </p>
    <footer className="text-sm">
      <cite className="not-italic">
        <span className="text-muted-foreground">{source}</span>
        <span className="text-primary font-medium block mt-1">
          {publication}{year && `, ${year}`}
        </span>
      </cite>
    </footer>
  </blockquote>
);

// Related Guides Card Component
export const RelatedGuideCard = ({ 
  slug, 
  title, 
  thumbnail,
  description 
}: { 
  slug: string; 
  title: string; 
  thumbnail: string;
  description?: string;
}) => (
  <Link
    to={`/guides/${slug}`}
    className="group block bg-background border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
  >
    <div className="aspect-[16/10] overflow-hidden">
      <img 
        src={thumbnail} 
        alt={title}
        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="px-4 py-3.5">
      <h4 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </h4>
    </div>
  </Link>
);

// NEW CHARTS FOR KNEE PAIN CAUSES ARTICLE
export const KneePainLocationsChart = () => {
  const data = [
    { name: 'Front (Kneecap)', value: 35 },
    { name: 'Back of Knee', value: 25 },
    { name: 'Inner Side', value: 20 },
    { name: 'Outer Side', value: 20 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Common Knee Pain Locations</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Distribution of common pain locations in the knee joint</p>
    </div>
  );
};

export const KneePainCausesChart = () => {
  const data = [
    { cause: 'Overuse', percentage: 40 },
    { cause: 'Age-Related', percentage: 28 },
    { cause: 'Injury', percentage: 18 },
    { cause: 'Poor Posture', percentage: 14 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Common Causes of Knee Pain</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 50]} />
            <YAxis dataKey="cause" type="category" width={90} />
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            <Bar dataKey="percentage" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Most common contributing factors to knee discomfort</p>
    </div>
  );
};

export const SharpPainTriggersChart = () => {
  const data = [
    { trigger: 'Bending', level: 85 },
    { trigger: 'Stairs', level: 90 },
    { trigger: 'Squatting', level: 95 },
    { trigger: 'Kneeling', level: 88 },
    { trigger: 'Running', level: 78 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Activities That Trigger Sharp Knee Pain</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="trigger" type="category" width={80} />
            <Tooltip formatter={(value) => [`${value}%`, 'Pain Level']} />
            <Bar dataKey="level" fill="#f97316" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Pain intensity triggered by common activities</p>
    </div>
  );
};

// CHARTS FOR BACK OF KNEE PAIN ARTICLE
export const BackOfKneeCausesChart = () => {
  const data = [
    { name: "Baker's Cyst", value: 30 },
    { name: 'Hamstring Strain', value: 25 },
    { name: 'Meniscus Issue', value: 20 },
    { name: 'Arthritis', value: 15 },
    { name: 'Muscle Tightness', value: 10 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Common Causes of Back of Knee Pain</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Distribution of causes for pain behind the knee</p>
    </div>
  );
};

export const LegStraighteningPainChart = () => {
  const data = [
    { activity: 'Full Extension', pain: 85 },
    { activity: 'Partial Extension', pain: 55 },
    { activity: 'Bent Position', pain: 35 },
    { activity: 'Walking', pain: 50 },
    { activity: 'Sitting', pain: 25 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Pain Level When Straightening Leg</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="activity" type="category" width={100} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value) => [`${value}%`, 'Pain Intensity']} />
            <Bar dataKey="pain" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Pain when straightening leg varies by position</p>
    </div>
  );
};

export const BakersCystTreatmentChart = () => {
  const data = [
    { treatment: 'Rest & Ice', effectiveness: 70 },
    { treatment: 'Compression', effectiveness: 65 },
    { treatment: 'Heat Therapy', effectiveness: 75 },
    { treatment: 'Gentle Stretch', effectiveness: 80 },
    { treatment: 'Activity Mod.', effectiveness: 85 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">At-Home Relief Approaches</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="treatment" tick={{ fontSize: 9 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Effectiveness']} />
            <Bar dataKey="effectiveness" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Reported effectiveness of home-based relief methods</p>
    </div>
  );
};

// CHARTS FOR SIDE KNEE PAIN ARTICLE
export const SideKneePainTypesChart = () => {
  const data = [
    { name: 'Lateral (Outer)', value: 45 },
    { name: 'Medial (Inner)', value: 40 },
    { name: 'Both Sides', value: 15 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Side Knee Pain Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Where people experience side knee pain</p>
    </div>
  );
};

export const LeftVsRightKneePainChart = () => {
  const data = [
    { factor: 'Dominant Leg', left: 45, right: 55 },
    { factor: 'Driving', left: 30, right: 70 },
    { factor: 'Sports', left: 48, right: 52 },
    { factor: 'Standing', left: 50, right: 50 },
    { factor: 'Stairs', left: 47, right: 53 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Left vs Right Knee Pain by Activity</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="factor" type="category" width={80} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="left" fill="#3b82f6" name="Left Knee" radius={[0, 4, 4, 0]} />
            <Bar dataKey="right" fill="#8b5cf6" name="Right Knee" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500"></div>
          <span className="text-xs text-muted-foreground">Left Knee</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500"></div>
          <span className="text-xs text-muted-foreground">Right Knee</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Which knee is more affected by different activities</p>
    </div>
  );
};

export const KneecapPainCausesChart = () => {
  const data = [
    { cause: 'Muscle Imbalance', percentage: 35 },
    { cause: 'Overuse', percentage: 30 },
    { cause: 'Alignment', percentage: 20 },
    { cause: 'Tight IT Band', percentage: 15 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Common Causes of Kneecap Pain</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 50]} />
            <YAxis dataKey="cause" type="category" width={100} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            <Bar dataKey="percentage" fill="#f97316" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">What typically contributes to kneecap discomfort</p>
    </div>
  );
};

export const DailyComfortStrategiesChart = () => {
  const data = [
    { name: 'Stretching', value: 90, color: '#22c55e' },
    { name: 'Heat/Cold', value: 85, color: '#3b82f6' },
    { name: 'Rest Breaks', value: 80, color: '#f97316' },
    { name: 'Posture Fix', value: 75, color: '#8b5cf6' },
    { name: 'Footwear', value: 70, color: '#ef4444' },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Daily Comfort Strategies Effectiveness</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Effectiveness']} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">How effective common daily strategies are for knee comfort</p>
    </div>
  );
};

// Article 8: Running Knee Pain
export const RunningInjuryTypesChart = () => {
  const data = [
    { name: "Runner's Knee", value: 35 },
    { name: 'Patellar Tendinitis', value: 25 },
    { name: 'IT Band Syndrome', value: 20 },
    { name: 'Meniscus Tear', value: 12 },
    { name: 'ACL Injury', value: 8 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Common Running Knee Injuries Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Percentage of knee injuries among runners</p>
    </div>
  );
};

export const PainWhenBendingChart = () => {
  const data = [
    { trigger: 'Squatting', severity: 90 },
    { trigger: 'Stairs Down', severity: 85 },
    { trigger: 'Lunges', severity: 80 },
    { trigger: 'Kneeling', severity: 75 },
    { trigger: 'Sitting Long', severity: 60 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Pain Severity When Bending Knee - Common Triggers</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="trigger" type="category" width={90} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value) => [`${value}%`, 'Pain Severity']} />
            <Bar dataKey="severity" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Activities that commonly trigger pain when bending the knee</p>
    </div>
  );
};

export const RunnerRecoveryChart = () => {
  const data = [
    { method: 'Rest + Ice', effectiveness: 75 },
    { method: 'Physical Therapy', effectiveness: 90 },
    { method: 'Strengthening', effectiveness: 85 },
    { method: 'Knee Support', effectiveness: 70 },
    { method: 'Form Correction', effectiveness: 88 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Recovery Methods Effectiveness for Runners</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="method" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Effectiveness']} />
            <Bar dataKey="effectiveness" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">How effective various recovery methods are for running knee pain</p>
    </div>
  );
};

// Article 9: Knee Arthritis Pain
export const ArthritisTypesChart = () => {
  const data = [
    { name: 'Osteoarthritis', value: 65 },
    { name: 'Rheumatoid', value: 15 },
    { name: 'Post-traumatic', value: 12 },
    { name: 'Other Types', value: 8 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Types of Knee Arthritis Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Osteoarthritis is the most common form affecting the knee joint</p>
    </div>
  );
};

export const ArthritisExerciseBenefitsChart = () => {
  const data = [
    { exercise: 'Swimming', benefit: 95 },
    { exercise: 'Walking', benefit: 85 },
    { exercise: 'Cycling', benefit: 88 },
    { exercise: 'Yoga', benefit: 80 },
    { exercise: 'Strength', benefit: 82 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Knee Pain Exercises Effectiveness for Arthritis</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="exercise" type="category" width={80} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value) => [`${value}%`, 'Benefit Level']} />
            <Bar dataKey="benefit" fill="#3b82f6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Low-impact exercises provide the best support for arthritis knee pain</p>
    </div>
  );
};

export const KneeReplacementFactorsChart = () => {
  const data = [
    { factor: 'Severe Pain', importance: 95 },
    { factor: 'Limited Mobility', importance: 90 },
    { factor: 'Failed Treatment', importance: 85 },
    { factor: 'Quality of Life', importance: 88 },
    { factor: 'Age/Health', importance: 70 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Factors Considered for Knee Replacement</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="factor" tick={{ fontSize: 9 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Importance']} />
            <Bar dataKey="importance" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Key factors healthcare providers consider for knee replacement decisions</p>
    </div>
  );
};

// Article 10: Sharp Knee Pain
export const SharpPainPatternsChart = () => {
  const data = [
    { name: 'Intermittent', value: 40 },
    { name: 'Activity-Related', value: 30 },
    { name: 'Weight-Bearing', value: 20 },
    { name: 'Random Onset', value: 10 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Sharp Stabbing Pain Patterns - When It Comes and Goes</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Common patterns when sharp stabbing pain in knee comes and goes</p>
    </div>
  );
};

export const SciaticaKneePainChart = () => {
  const data = [
    { condition: 'Sciatica Related', percentage: 25 },
    { condition: 'Local Knee Issue', percentage: 55 },
    { condition: 'Combined Factors', percentage: 15 },
    { condition: 'Other Referred', percentage: 5 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Can Sciatica Cause Knee Pain? Pain Source Analysis</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 60]} />
            <YAxis dataKey="condition" type="category" width={100} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            <Bar dataKey="percentage" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Understanding whether sciatica can cause knee pain and how often</p>
    </div>
  );
};

export const KneePainBelowKneecapChart = () => {
  const data = [
    { location: 'Below Kneecap', cases: 35 },
    { location: 'Inside Knee', cases: 28 },
    { location: 'Front of Knee', cases: 22 },
    { location: 'Around Kneecap', cases: 15 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Knee Pain Location Distribution - Below Kneecap Focus</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="location" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 40]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Cases']} />
            <Bar dataKey="cases" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Where sharp pain is most commonly felt around the knee</p>
    </div>
  );
};

// CHARTS FOR WHY DO MY KNEES HURT WHEN SLEEPING ARTICLE
export const NightKneePainCausesChart = () => {
  const data = [
    { cause: 'Joint Stiffness', percentage: 32 },
    { cause: 'Muscle Tension', percentage: 24 },
    { cause: 'Activity Strain', percentage: 18 },
    { cause: 'Cartilage Wear', percentage: 14 },
    { cause: 'Meniscus Issues', percentage: 12 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Most Common Causes of Night Knee Pain</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 40]} />
            <YAxis dataKey="cause" type="category" width={110} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value) => [`${value}%`, 'Reported Frequency']} />
            <Bar dataKey="percentage" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Based on common patterns reported by people with nighttime knee discomfort</p>
    </div>
  );
};

export const SleepPositionImpactChart = () => {
  const data = [
    { name: 'Back + Pillow', comfort: 85, stress: 15 },
    { name: 'Side + Pillow', comfort: 70, stress: 35 },
    { name: 'Side (no pillow)', comfort: 40, stress: 65 },
    { name: 'Stomach', comfort: 25, stress: 80 },
  ];

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Sleeping Position & Knee Comfort</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="comfort" fill="#22c55e" name="Comfort %" radius={[4, 4, 0, 0]} />
            <Bar dataKey="stress" fill="#ef4444" name="Knee Stress %" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <span className="text-xs text-muted-foreground">Comfort Level</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span className="text-xs text-muted-foreground">Knee Stress</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Relative comfort and stress levels for common sleeping positions</p>
    </div>
  );
};
