import { getTestimonials } from "@/app/actions/testimonials";
import TestimonialsClient from "./TestimonialsClient";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-gray-300">Manage client reviews and feedback.</p>
        </div>
      </div>
      
      <TestimonialsClient initialData={testimonials} />
    </div>
  );
}
