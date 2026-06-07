import React,{useState} from 'react';
import Searchfilter from '../Components/Searchfilter';
import Categories from '../Components/CategoriesFilter';
import ProductCard from '../Components/ProductCard';
import { useCart } from '../Context/CartContext';
const ProductList = () => {
  const { products } = useCart(); // destructuring products from the context
    const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filterProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  
  
  
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Searchfilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Categories 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        />
        <h2 className="text-2xl font-extrabold mx-auto px-4 md:px-4 pt-4">
          Featured Gear({products.length} Items)</h2>
     
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-6">
        {filterProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
     </div>
      
      </div>

    </>
  );
}

export default ProductList;
