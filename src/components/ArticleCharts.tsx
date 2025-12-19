import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Quote } from 'lucide-react';

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

export const TipsList = ({ tips }: { tips: string[] }) => (
  <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-6 my-8 border border-green-200 dark:border-green-900">
    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
      <span className="text-green-600">✓</span> Quick Tips
    </h3>
    <ul className="space-y-2">
      {tips.map((tip, index) => (
        <li key={index} className="flex items-start gap-3 text-muted-foreground text-sm">
          <span className="text-green-600 mt-1">•</span>
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  </div>
);

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
  <blockquote className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-6 my-8 border-l-4 border-blue-500 relative">
    <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-200 dark:text-blue-800" />
    <p className="text-foreground font-light leading-relaxed italic mb-4 pr-8">
      "{quote}"
    </p>
    <footer className="text-sm">
      <cite className="not-italic">
        <span className="text-muted-foreground">{source}</span>
        <span className="text-blue-600 dark:text-blue-400 font-medium block mt-1">
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
  description: string;
}) => (
  <a 
    href={`/guides/${slug}`}
    className="group block bg-background border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-border transition-all duration-300"
  >
    <div className="h-32 overflow-hidden">
      <img 
        src={thumbnail} 
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-4">
      <h4 className="text-sm font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground line-clamp-2">
        {description}
      </p>
    </div>
  </a>
);
