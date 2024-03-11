const apiUrl = 'https://amz-reviews-rating-json.vercel.app/reviews';


function rotate() {
  if (document.getElementById("btn-ar").innerHTML == "v") {
    document.getElementById("btn-ar").innerHTML = "^";
  }
  else {
    document.getElementById("btn-ar").innerHTML = "v";
  }

}

//main code to fetch and display the data

function onPageLoad() {
  // Your code here
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(userData => {
      const asinNum = "B00XN80O34";
      userData.forEach(asin => {
        if (asin.asin === asinNum) {
          console.log('Rating:', asin.summary.rating);
          document.getElementById("pr_rating").innerHTML = asin.summary.rating;



          //****************************************************************** */

          // asin.reviews.forEach(rev => {
          //   // console.log('Review:', rev);
          //   // console.log(asin.reviews.length);
          //   if (rev.profile && rev.profile.image) {
          //     console.log('Profile Image:', rev.profile.image);
          //     document.getElementById("img").src = rev.profile.image;
          //   }
          // });

          //******************************************************************************** */


          // var msg = "No reviews available";
          // if ((asin.reviews.length === 0)) {
          //   asin.revi=msg;
          // }



          let data1 = "";
          let data3 = "";
          let data4 = [0, 0, 0, 0, 0];
          let data5 = "";
          let total = 0;

          asin.reviews.forEach((review) => {

            const maxLength = 100; // Maximum length of truncated review body
            let truncatedBody = review.body;
            if (truncatedBody.length > maxLength) {
              truncatedBody = truncatedBody.substring(0, maxLength) + '...'; // Truncate and add ellipsis
            }

            let dateStr = review.date.raw;
            let parts = dateStr.split("on");
            let date = parts[1].trim(); // Trim to remove any leading or trailing whitespace


            // if(review.profile.image === null){
            //    getElementById("user-img").src = review.profile.image;
            // }
            console.log(review.profile.image);
            // images path
            var image = "./images.jpg";
            console.log(image);
            if ((review.profile.image !== undefined)) {
              image = review.profile.image;
            }
            console.log(image);


            data4[parseInt(review.rating) - 1]++;


            // data5 = "";
            // console.log("The Rating is" + review.rating);
            // for (let i = 0; i < 5; i++) {
            //   console.log(i);
            //   if (i < parseInt(review.rating)) {
            //     data5 += `<h class="bi bi-star-fill fs-6" id="filled-star"></h>`;
            //   }
            //   // else if( i== parseInt(review.rating)){
            //   //   data5 += `<h class="bi-star-half fs-3 " id="filled-star"></h>`

            //   // }
            //   else {
            //     data5 += `<h class="bi empty fs-6" id="filled-star"></h>`;
            //   }
            // }

            console.log(`ofsdifdpiu ${parseFloat(review.rating)}`)


            // let starRatingWrapper_rev = document.querySelector('.star-rating-rev');
            // console.log(starRatingWrapper_rev);
            // let frontStars_rev =  document.querySelector('.front-stars-rev');
            let perc_rev = ((parseFloat(review.rating))/5)*100;

            let percentage_rev = perc_rev + '%';
            
            // starRatingWrapper_rev.title = percentage_rev;
            // frontStars_rev.style.width = percentage_rev;
            console.log(`perc_rev ${percentage_rev}`)


            let star_text = `<div class="stars-landing fs-5" id="stars-box" style="--rating: ${review.rating};" aria-label="Rating of this product is 2.3 out of 5."></div>`
        

            data1 += `
                <div class="img-add-rat d-flex" id="Customer1">
                    <div class="img-add-c" id="im-add">
                        <div class='img position-relative d-flex' id="User-img">
                            <img src=${image} id="img" alt="Rounded circle Image" class="rounded-circle" width='45'
                                height='45'>
                            <img src="amazon.png" alt="Amazon-img" class="rounded-circle align-self-end" id="amzn-img"
                                width="15" height="15">

                        </div>
                        </div>
                    <div class="name_add" id="n-ad">
                        <div class="name" id="name">
                            <h>${review.profile.name}</h>
                        </div>
                        <div class="col-sm" id="add">
                            <p>
                                ${review.review_country}
                            </p>
                        </div>
                    </div>
                    <div class="star-date-rev-desc " id="user">
                        <div class="star-date" id="data">
                                ${star_text}
                            <div class="date" id="date">
                                <h>
                                   ${date}
                                </h>
        
                        </div>
                        <div class="rev" id="rev-title1">
                            <h5>
                                ${review.title}
                            </h5>
                        </div>
                        <div class="rev2 d-flex" id="rev-title2">
                            <p>
                               ${truncatedBody}
                            </p>
                        </div>
                    </div>
                </div> 
                </div>`;





          });


          total = asin.reviews.length;
          let rating = Math.round(parseFloat(asin.summary.rating));
          console.log(rating);
          console.log(data4);
          console.log(`rating ${parseFloat(asin.summary.rating)}`)

        //   for (let i = 0; i < 5; i++) {
        //     if (i < asin.summary.rating ) {
        //       if(i === parseInt(asin.summary.rating) && asin.summary.rating % 1 != 0)
        //        {
        //       //   data3 += `<i class="fi fi-ss-star-sharp-half"></i>`;
        //       //   continue;
        //       // }else{
        //         console.log("i",i)
        //         data3 += `<h class="bi bi-star-fill custom-svg-ratings fs-3" id="filled-star"></h>`;
        //       }
        //     } else {
        //       console.log("hiiii")
        //       data3 += `<h class="bi empty fs-3" id="filled-star"></h>`;
        //     }
        //   }

        // const starRatingWrapper = document.querySelector('.star-rating');
        // const frontStars =  document.querySelector('.front-stars');
        // let perc = ((parseFloat(asin.summary.rating))/5)*100;
        // console.log(`rating_at ${perc}`)

        // const percentage = perc + '%';
        
        // starRatingWrapper.title = percentage;
        // frontStars.style.width = percentage;

    

        console.log(asin.summary.rating)
        document.getElementById("stars-b").setAttribute("style",`--rating: ${asin.summary.rating}`);
        

          document.getElementById("reviews-container").innerHTML = data1;
          document.getElementById("all-rev").innerHTML = "(" + asin.reviews.length + ")";

          //document.getElementById("filled-star-rat").innerHTML = data3;
          document.getElementById("progress-1").value = data4[0] * 100 / total;
          document.getElementById("progress-2").value = data4[1] * 100 / total;
          document.getElementById("progress-3").value = data4[2] * 100 / total;
          document.getElementById("progress-4").value = data4[3] * 100 / total;
          document.getElementById("progress-5").value = data4[4] * 100 / total;
          document.getElementById("rev-1").innerHTML = data4[0] + " Reviews";
          document.getElementById("rev-2").innerHTML = data4[1] + " Reviews";
          document.getElementById("rev-3").innerHTML = data4[2] + " Reviews";
          document.getElementById("rev-4").innerHTML = data4[3] + " Reviews";
          document.getElementById("rev-5").innerHTML = data4[4] + " Reviews";

          
        //   document.getElementById("star-box-main").style.rating = asin.summary.rating;






          //************************************************************************************************* */
        }
      })




    })
    .catch(error => {
      console.error('Error:', error);
    });

}

window.onload = onPageLoad;

