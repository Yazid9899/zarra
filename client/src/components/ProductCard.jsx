import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/action/actionCreator";
import { useNavigate } from "react-router-dom";

export default function ProductCard() {
  // const [id, setId] = useState(product.product.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.products);
  const seeProductDetail = (slug, id) => {
    console.log(slug);
    navigate(`/customers/detail/${slug}/${id}`);
  };
  const toRupiah = (value) => {
    return value.toLocaleString("id-ID");
  };
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-4 g-4 mx-3 my-4">
        {products?.map((product) => (
          <div key={product.id} className="col">
            <div
              className="card"
              onClick={() => {
                seeProductDetail(product.slug, product.id);
              }}
            >
              <img src={product.mainImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div className="d-flex justify-content-between">
                  <p className="card-text">IDR {toRupiah(product.price)}</p>
                  <h5 className="card-title">{product.Category.name}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
