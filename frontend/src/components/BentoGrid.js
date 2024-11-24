import React from 'react';
import { Truck, Leaf, BarChart2, HeadsetIcon as HeadsetMic, Apple, Carrot } from 'lucide-react';

const BentoItem = ({ title, description, icon: Icon, color, textColor }) => (
  <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${color} ${textColor}`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-sm opacity-90">{description}</p>
  </div>
);

const BentoGrid = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-700">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BentoItem
          title="Fast Delivery"
          description="Get your fresh groceries delivered quickly and efficiently."
          icon={Truck}
          color="bg-green-100"
          textColor="text-green-800"
        />
        <BentoItem
          title="Eco-Friendly"
          description="We use sustainable practices to reduce our environmental impact."
          icon={Leaf}
          color="bg-lime-100"
          textColor="text-lime-800"
        />
        <BentoItem
          title="Quality Control"
          description="Our advanced systems ensure only the best products reach you."
          icon={BarChart2}
          color="bg-emerald-100"
          textColor="text-emerald-800"
        />
        <BentoItem
          title="24/7 Support"
          description="Our customer support team is always here to assist you."
          icon={HeadsetMic}
          color="bg-teal-100"
          textColor="text-teal-800"
        />
        <BentoItem
          title="Fresh Produce"
          description="We source the freshest fruits and vegetables for you."
          icon={Apple}
          color="bg-yellow-100"
          textColor="text-yellow-800"
        />
        <BentoItem
          title="Wide Selection"
          description="From organic to local, find all your grocery needs with us."
          icon={Carrot}
          color="bg-orange-100"
          textColor="text-orange-800"
        />
      </div>
    </div>
  );
};

export default BentoGrid;

