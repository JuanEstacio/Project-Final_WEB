import LazyLoad from "react-lazy-load";
import { useSelector } from "react-redux";
import { MetroSpinner } from "react-spinners-kit";

const Products = () => {
  const { loading, products, error } = useSelector((state) => state.products);
  
  return (
    <div className="products-container">
      {loading ? (
        <div className="loading">
            <MetroSpinner loading={loading} size={30} color="#db0606" />
        </div>
      ) : (
        <>
          {error ? (
            <div className="error-msg">{error}</div>
          ) : (
            <>
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <div className="product-card" key={product.id}>
                    <div className="product-img-div">
                      <LazyLoad threshold={0.95} width={`100%`} height={`100%`}>
                        <img src={product.image} alt="product" />
                      </LazyLoad>
                    </div>
                    <p>{product.title}</p>
                    <button type="button">${product.price}</button>
                  </div>
                ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
