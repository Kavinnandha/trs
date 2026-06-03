export interface TestimonialProps {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
}

export const testimonialsData: TestimonialProps[] = [
  {
    id: "test-1",
    name: "Rohan Desai",
    role: "Tech Entrepreneur, Bangalore",
    content: "TRS Realty helped me acquire a prime 2-acre agricultural plot near Igatpuri. The title verification process was thorough, and the entire land purchase was completely transparent. My farm land has already appreciated 40% in three years.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "test-2",
    name: "Aarti Sharma",
    role: "Real Estate Investor, Mumbai",
    content: "I've been investing in land for over a decade, and TRS Realty's expertise in zoning laws and NA conversion processes is unmatched. They helped me identify a high-growth commercial plot on the Pune-Mumbai Expressway corridor.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "test-3",
    name: "Vikram Singhania",
    role: "NRI Investor, Dubai",
    content: "As an NRI, buying land in India seemed legally daunting. TRS Realty managed everything — from remote site visits with drone surveys to complete legal documentation. They found me the perfect residential plot in a gated community near Sarjapur.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  }
];
