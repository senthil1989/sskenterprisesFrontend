import React from "react";

const ReviewCard = ({
    item
}) => {
  console.log(item)
    return(
        <div className="user_review">
            <div className="reviewer_name"><span className="icon-account_circle"></span> {item.name}</div>
            <div className="star-rating">
              <div className="star-rating__wrap">
                <label
                  className={`star-rating__ico icon-star-${(item.rating>=1)?'full':'empty'}`}
                  for="star-rating-5"
                  title="1 out of 5 stars"
                ></label>
                <label
                  className={`star-rating__ico icon-star-${(item.rating>=2)?'full':'empty'}`}
                  for="star-rating-4"
                  title="2 out of 5 stars"
                ></label>
                <label
                  className={`star-rating__ico icon-star-${(item.rating>=3)?'full':'empty'}`}
                  for="star-rating-3"
                  title="3 out of 5 stars"
                ></label>
                <label
                  className={`star-rating__ico icon-star-${(item.rating>=4)?'full':'empty'}`}
                  for="star-rating-2"
                  title="4 out of 5 stars"
                ></label>
                <label
                  className={`star-rating__ico icon-star-${(item.rating>=5)?'full':'empty'}`}
                  for="star-rating-1"
                  title="5 out of 5 stars"
                ></label>
              </div>
              </div>
        <div><span>
            {item.content}
            </span></div>
    </div>
    )
   
};

export default ReviewCard;