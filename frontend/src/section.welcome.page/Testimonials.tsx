import React from 'react';
import Container from '../components/Container';
import Testimonial from '../components/Testimonial';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content: "NAAS has completely transformed how our community manages savings. What used to take hours of manual tracking now happens automatically, and everyone has full transparency.",
      author: "Sarah Johnson",
      role: "Group Administrator",
      image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      content: "The automated reminders and secure payment system have increased our collection rate by 95%. Our members love the transparency and ease of use.",
      author: "Michael Okafor",
      role: "Community Leader",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      content: "As someone who manages three different savings groups, NAAS has been a game-changer. The ability to customize each group's rules while maintaining consistent reporting is invaluable.",
      author: "Priya Sharma",
      role: "Financial Coordinator",
      image: "https://images.pexels.com/photos/3608039/pexels-photo-3608039.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of community groups already saving with NAAS
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;