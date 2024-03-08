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
      const asinNum = "B09NBYWBYP";
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


            data5 = "";
            console.log("The Rating is" + review.rating);
            for (let i = 0; i < 5; i++) {
              if (i < parseInt(review.rating)+0.5) {
                data5 += `<h class="bi bi-star-fill fs-6" id="filled-star"></h>`;
              } 
              else if( i== parseInt(review.rating)+0.5){
                data5 += `<h class="bi-star-half fs-3 " id="filled-star"></h>`
            
              }
              else {
                data5 += `<h class="bi empty fs-6" id="filled-star"></h>`;
              }
            }

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
                            <div class="nstar" id="nstar">
                            ${data5}
                            </div>
                            <div class="date" id="date">
                                <h>
                                   ${date}
                                </h>
                            </div>
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
          // let rating = Math.round(parseFloat(asin.summary.rating));
          // console.log(rating);
          //console.log(data4);
          
          for (let i = 0; i < 5; i++) {
            if (i < asin.summary.rating) {
              data3 += `<h class="bi bi-star-fill  fs-3" id="filled-star"></h>`;
            } else {
              data3 += `<h class="bi empty fs-3" id="filled-star"></h>`;
            }
          }

          document.getElementById("reviews-container").innerHTML = data1;
          document.getElementById("all-rev").innerHTML = "(" + asin.reviews.length + ")";
          document.getElementById("filled-star-rat").innerHTML = data3;
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





          //************************************************************************************************* */
        }
      })




    })
    .catch(error => {
      console.error('Error:', error);
    });

}

window.onload = onPageLoad;

