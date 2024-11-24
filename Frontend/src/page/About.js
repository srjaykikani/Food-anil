import React from 'react'
import { Truck, ShieldCheck, Leaf } from 'lucide-react'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-600">About Fresh Mart</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto text-center">
        Fresh Mart is your trusted partner for high-quality, fresh groceries delivered right to your doorstep. We're committed to providing the best products and service to our valued customers.
      </p>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Truck className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Fast Delivery</h2>
          <p className="text-gray-600">We ensure your groceries reach you quickly and in perfect condition.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <ShieldCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Quality Guarantee</h2>
          <p className="text-gray-600">We source only the best products to ensure your satisfaction.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Fresh & Organic</h2>
          <p className="text-gray-600">Our products are fresh, organic, and locally sourced when possible.</p>
        </div>
      </div>
      <div className="bg-green-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Our Mission</h2>
        <p className="text-gray-700">
          At Fresh Mart, our mission is to make healthy eating accessible to everyone. We strive to provide the freshest, highest-quality groceries while supporting local farmers and sustainable practices.
        </p>
      </div>
    </div>
  )
}

export default About
