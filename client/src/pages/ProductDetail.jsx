import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { fetchProductById } from "../store/action/actionCreator";

export default function ProductDetail() {
  const { slug, id } = useParams();
  const dispatch = useDispatch();
  const { productById, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch]);
  return (
    <>
      <NavLink to="/customers/home" className="mx-4 backhome">
        back
      </NavLink>

      <div className="d-flex position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="scroll-container overflow-auto">
          <img className="image-fluid detail-img " src={productById?.mainImg} />
          <img
            className="image-fluid detail-img "
            src={productById?.Images[0].imgUrl}
          />
          <img
            className="image-fluid detail-img "
            src={productById?.Images[1].imgUrl}
          />
          <img
            className="image-fluid detail-img "
            src={productById?.Images[2].imgUrl}
          />
        </div>
        <div className="d-flex flex-column justify-conten-around mx-5">
          <h3 className="detail-title">{productById?.name}</h3>
          <div className="detail-description">{productById?.description}</div>
          <div className="d-flex justify-content-between">
            <div className="detail-price">
              IDR {productById?.price.toLocaleString("id-ID")}
            </div>
            <div className="detail-category">{productById?.Category.name}</div>
          </div>
        </div>
      </div>
    </>
  );
}
