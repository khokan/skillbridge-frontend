import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Clock, Star, Users, BookOpen, TrendingUp } from "lucide-react";

export default function HomePage() {
  const featuredTutors = [
    { name: "Alex Johnson", subject: "Mathematics", rating: 4.9, sessions: 120 },
    { name: "Maria Chen", subject: "Physics", rating: 4.8, sessions: 95 },
    { name: "David Wilson", subject: "English Literature", rating: 4.7, sessions: 150 },
    { name: "Sarah Miller", subject: "Chemistry", rating: 5.0, sessions: 80 },
  ];

  const subjects = [
    { name: "Mathematics", tutors: 42, icon: "∑" },
    { name: "Physics", tutors: 28, icon: "⚛" },
    { name: "English", tutors: 35, icon: "📚" },
    { name: "Chemistry", tutors: 19, icon: "🧪" },
    { name: "Computer Science", tutors: 31, icon: "💻" },
    { name: "Languages", tutors: 46, icon: "🗣" },
    { name: "Business", tutors: 23, icon: "💼" },
    { name: "Art & Music", tutors: 27, icon: "🎨" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* ================= HERO SECTION ================= */}
      <section className="grid items-center gap-12 lg:gap-16 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
              <TrendingUp className="mr-2 h-3 w-3" />
              Trusted by 10,000+ learners
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Master New Skills with{" "}
              <span className="text-primary">Expert Tutors</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
              Connect with verified tutors, book sessions instantly, and achieve your learning goals. 
              From academics to professional skills—learn anything, anytime.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/tutors">
                <Users className="mr-2 h-4 w-4" />
                Find a Tutor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <Link href="/register/tutor">
                <BookOpen className="mr-2 h-4 w-4" />
                Become a Tutor
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="border-2 border-background">
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="ml-2 text-sm font-medium">4.8/5</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Rated by 2,500+ students
              </p>
            </div>
          </div>
        </div>

        <Card className="rounded-2xl border shadow-lg overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Live Availability
            </CardTitle>
            <CardDescription>
              Real-time booking with top-rated tutors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {featuredTutors.map((tutor, index) => (
              <div 
                key={tutor.name} 
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10">
                      {tutor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{tutor.name}</div>
                    <div className="text-sm text-muted-foreground">{tutor.subject}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium">{tutor.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{tutor.sessions} sessions</div>
                  </div>
                  <Button size="sm" variant="default" className="whitespace-nowrap">
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-2" asChild>
              <Link href="/tutors" className="text-primary">
                View all tutors →
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="space-y-10">
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="px-3 py-1">
            Simple Process
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How SkillBridge Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From finding the perfect tutor to mastering new skills—all in three simple steps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Find Your Expert",
              description: "Browse verified tutors by subject, rating, and availability. Watch intro videos and read reviews.",
              icon: Users,
              color: "text-blue-600"
            },
            {
              step: "02",
              title: "Book Instantly",
              description: "Check real-time availability and book sessions with one click. No waiting for responses.",
              icon: Clock,
              color: "text-purple-600"
            },
            {
              step: "03",
              title: "Learn & Grow",
              description: "Join interactive sessions, track your progress, and achieve your learning goals.",
              icon: TrendingUp,
              color: "text-green-600"
            },
          ].map((item) => (
            <Card key={item.step} className="rounded-2xl border hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`text-2xl font-bold ${item.color}`}>{item.step}</div>
                  <div className={`p-3 rounded-full bg-${item.color.split('-')[0]}-50`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= POPULAR CATEGORIES ================= */}
      <section className="space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Popular Subjects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from experts across hundreds of subjects and skill areas
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.slice(0, 4).map((subject) => (
            <Card key={subject.name} className="rounded-xl border hover:border-primary/50 hover:shadow-md transition-all group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-3xl mb-2">{subject.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {subject.tutors} expert tutors
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/tutors?subject=${subject.name.toLowerCase()}`}>
                    Browse Tutors
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-8">
          {subjects.map((subject) => (
            <Badge 
              key={subject.name} 
              variant="outline" 
              className="px-3 py-2 text-sm font-normal hover:bg-primary/10 hover:text-primary cursor-pointer"
              asChild
            >
              <Link href={`/tutors?subject=${subject.name.toLowerCase()}`}>
                {subject.name}
              </Link>
            </Badge>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="rounded-3xl border bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted Learning Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of learners and tutors who trust SkillBridge for quality education
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { value: "10,000+", label: "Active Learners", icon: Users },
              { value: "500+", label: "Expert Tutors", icon: CheckCircle },
              { value: "50,000+", label: "Sessions Completed", icon: BookOpen },
              { value: "4.8★", label: "Average Rating", icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you want to learn new skills or share your expertise, SkillBridge makes it simple and rewarding.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="h-12 px-8">
            <Link href="/register/student">
              <Users className="mr-2 h-4 w-4" />
              Start Learning Free
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-8">
            <Link href="/register/tutor">
              <BookOpen className="mr-2 h-4 w-4" />
              Apply as Tutor
            </Link>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>No credit card required • Cancel anytime • 24/7 support</p>
        </div>
      </section>
    </div>
  );
}