"use client";

import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import DiscoverHero from "@/components/DiscoverHero";

const teamMembers = [
  {
    id: "britton",
    name: "Britton",
    slug: "britton",
    location: "Columbus, OH",
    role: "Brand President & Co-Founder",
    profile_picture: "/images/britton.jpg",
  },
  {
    id: "brady",
    name: "Brady",
    slug: "brady",
    location: "Columbus, OH",
    role: "CEO & Co-Founder",
    profile_picture: "/images/brady-new.png",
  },
  {
    id: "patrick",
    name: "Patrick",
    slug: "patrick",
    location: "Los Angeles, CA",
    role: "Senior Engineer",
    profile_picture: "/images/patrick.jpeg",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function BackstagePage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <MainNav />

      <div className="bg-navy pt-24">
        <DiscoverHero
          title="Meet the Team"
          subtitle="Get to know the people behind Level Play who are dedicated to empowering artists and venues."
          searchPlaceholder="Search team members..."
          showFilters={false}
        />

        <section className="bg-navy py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={fadeInUp}
                  className="group"
                >
                  <Card className="bg-navy-light border-navy hover:border-orange/50 transition-all duration-300 group overflow-hidden hover:scale-[1.02] hover:shadow-2xl">
                    <div className="h-80 relative bg-navy-dark">
                      <img
                        src={member.profile_picture || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange transition-colors duration-300">
                        {member.name}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                        <MapPin className="h-4 w-4 text-orange" />
                        <span>{member.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-orange/20 text-orange border-none text-xs">
                          {member.role}
                        </Badge>
                      </div>

                      <Link href={`/backstage/${member.slug}`}>
                        <Button className="w-full bg-orange hover:bg-orange/90 text-navy font-medium">
                          View Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
