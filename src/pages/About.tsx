import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Leaf, Users, Truck, Award, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Sustainable Farming",
      description: "We partner with farms that prioritize environmental sustainability and organic practices.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community First",
      description: "Supporting local farmers and connecting communities with fresh, locally-grown produce.",
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Farm to Table",
      description: "Direct delivery from farms to your table, ensuring maximum freshness and quality.",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Quality Assured",
      description: "Every product is carefully selected and quality-checked before reaching your doorstep.",
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Health Focused",
      description: "Promoting healthy eating through access to fresh, nutritious, and chemical-free produce.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Trust & Safety",
      description: "Secure transactions and reliable delivery with full satisfaction guarantee.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg",
      bio: "Former agricultural engineer with 15+ years experience in sustainable farming.",
    },
    {
      name: "Mike Chen",
      role: "Head of Operations",
      image: "/placeholder.svg",
      bio: "Supply chain expert ensuring seamless farm-to-table delivery operations.",
    },
    {
      name: "Emma Rodriguez",
      role: "Community Manager",
      image: "/placeholder.svg",
      bio: "Passionate about connecting farmers with consumers and building strong communities.",
    },
    {
      name: "David Kim",
      role: "Technology Lead",
      image: "/placeholder.svg",
      bio: "Software engineer dedicated to making fresh produce accessible through technology.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Connecting Communities with <span className="text-primary">Fresh Produce</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                FreshMarket was founded with a simple mission: to bridge the gap between local farmers 
                and consumers, ensuring everyone has access to fresh, sustainable, and healthy produce 
                while supporting our agricultural communities.
              </p>
              <Button size="lg" asChild>
                <Link to="/marketplace">Explore Our Marketplace</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Founded in 2020, FreshMarket emerged from a simple observation: there was a disconnect 
                    between the abundance of fresh produce grown by local farmers and the limited access 
                    consumers had to these products.
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Our founder, Sarah Johnson, grew up on a family farm and witnessed firsthand the challenges 
                    farmers face in reaching consumers directly. After working as an agricultural engineer for 
                    over a decade, she decided to create a platform that would empower both farmers and consumers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, we're proud to work with over 500 local farms across the country, delivering fresh, 
                    sustainable produce to thousands of families while supporting agricultural communities.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src="/placeholder.svg"
                    alt="Farm landscape"
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
                <p className="text-muted-foreground text-lg">
                  The principles that guide everything we do
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
                <p className="text-muted-foreground text-lg">
                  The passionate people behind FreshMarket
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-8">Our Impact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Partner Farms</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                  <p className="text-muted-foreground">Pounds of Produce Delivered</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/sell">Become a Partner Farm</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;