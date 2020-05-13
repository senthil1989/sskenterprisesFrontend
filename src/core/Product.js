import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated, reviewPost,getReview } from "./apiCore";
import { isAuthenticated } from "../auth";
import Card from "./Card";
import Modal from "./Modal";
import ReviewCard from "./ReviewCard";
import ZoomCard from "./ZoomCard";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [reviewList, setreviewList] = useState([]);
  const [error, setError] = useState(false);
  const [modalAction, setmodalAction] = useState({
    isOpen: false,
  });
  const [reviewState, setreviewState] = useState({
    rating: 0,
    content: "",
  });
  const user = isAuthenticated() && isAuthenticated().user;
  const token = isAuthenticated() && isAuthenticated().token;

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
    getReview(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setreviewList(data);
      }
    });
  };
  const reviewSubmit = () => {
    console.log(props.match.params);
    const data = {
      productId: props.match.params.productId,
      user: user,
      token: token,
      reviewState,
    };
    reviewPost(data).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
      }
    });
    setmodalAction({
      ...modalAction,
      isOpen: !modalAction.isOpen,
    });
  };
  const toggleModal = () => {
    console.log("fkdjkfjdksj");
    setmodalAction({
      ...modalAction,
      isOpen: !modalAction.isOpen,
    });
  };

  const toggleModalClose = () => {
    console.log("fkdjkfjdksj"); // modal close to reset input val
    setmodalAction({
      ...modalAction,
      isOpen: !modalAction.isOpen,
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.name === "rating") {
      setreviewState({
        ...reviewState,
        rating: e.target.value,
      });
    } else {
      setreviewState({
        ...reviewState,
        content: e.target.value,
      });
    }
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <>
      <Layout
        title={product && product.name}
        description={
          product &&
          product.description &&
          product.description.substring(0, 100)
        }
        className="container-fluid"
      >
        <div className="row">
          <div className="col-8">
            {product && product.description && (
              <ZoomCard product={product} showViewProductButton={false} />
            )}
          </div>

          <div className="col-4"></div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4>Related products</h4>
            <div className="related_product">
              {relatedProduct.map((p, i) => (
                <div className="mb-3" key={i}>
                  <Card product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <h4>Customer reviews</h4>
            <div className="related_product">
              <button onClick={toggleModal}>Write a product review</button>
            </div>
          </div>
          <div className="col-6">
          <h4>Customer Product reviews</h4>
        {reviewList.map((item, i) => (
        <ReviewCard item={item} key={i} />
      ))}
      {reviewList.length === 0? <h6>Your are the first reviewer</h6>:''}
      </div>
        </div>  
      </Layout>
      <Modal show={modalAction.isOpen} onClose={toggleModalClose}>
        <div className="modal-header">
          <h4 class="modal-title">Sent</h4>
          <span
            class="icon-clear"
            data-dismiss="modal"
            onClick={toggleModalClose}
            aria-label="Close"
          ></span>
        </div>
        <div className="modal-section">
          <div>
            <h5>Rating</h5>
            <div class="star-rating">
              <div class="star-rating__wrap">
                <input
                  class="star-rating__input"
                  id="star-rating-5"
                  type="radio"
                  name="rating"
                  value="5"
                  onChange={handleChange}
                />
                <label
                  class="star-rating__ico icon-star-empty"
                  for="star-rating-5"
                  title="5 out of 5 stars"
                ></label>
                <input
                  class="star-rating__input"
                  id="star-rating-4"
                  type="radio"
                  name="rating"
                  value="4"
                  onChange={handleChange}
                />
                <label
                  class="star-rating__ico icon-star-empty"
                  for="star-rating-4"
                  title="4 out of 5 stars"
                ></label>
                <input
                  class="star-rating__input"
                  id="star-rating-3"
                  type="radio"
                  name="rating"
                  value="3"
                  onChange={handleChange}
                />
                <label
                  class="star-rating__ico icon-star-empty"
                  for="star-rating-3"
                  title="3 out of 5 stars"
                ></label>
                <input
                  class="star-rating__input"
                  id="star-rating-2"
                  type="radio"
                  name="rating"
                  value="2"
                  onChange={handleChange}
                />
                <label
                  class="star-rating__ico icon-star-empty"
                  for="star-rating-2"
                  title="2 out of 5 stars"
                ></label>
                <input
                  class="star-rating__input"
                  id="star-rating-1"
                  type="radio"
                  name="rating"
                  value="1"
                  onChange={handleChange}
                />
                <label
                  class="star-rating__ico icon-star-empty"
                  for="star-rating-1"
                  title="1 out of 5 stars"
                ></label>
              </div>
            </div>
          </div>
          <div>
            <h4>Write your review</h4>
            <textarea
              placeholder="What did you like or dislike? What did you use this product for?"
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <span
              data-hook="ryp-review-submit-button"
              class="a-button a-button-normal a-button-primary"
            >
              <span class="a-button-inner">
                <button
                  class="a-button-text"
                  type="button"
                  value="Submit"
                  onClick={reviewSubmit}
                >
                  Submit
                </button>
              </span>
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Product;
