console.log("index is connected");

const showLoader=()=>{
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}
const hideLoader=()=>{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}

function removeActiveClass() {
    const activeButtons= document.getElementsByClassName("active");
}
// problem-1
// for (let btn of activeButtons) {
//     btn.classList.remove("active")
// }

function loadCategories() {
    // 1- fetch the data

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2 - convert promise to json
    .then((res) => res.json())
    // 3 - send data to display
    .then((data) => displayCategories(data.categories));
}

// problem-2
function loadVideos(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) =>  displayVideos(data.videos));
    // { removeActiveClass();
    //      document.getElementById("btn-all").classList.add("active");}
}

const loadCategoryVideos = (id) => {
    showLoader();
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    ` ;
    console.log(url);

    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        const clickedButton = document.getElementById(`btn-${id}`);
        removeActiveClass();
        clickedButton.classList.add("active");
        console.log(clickedButton)
        displayVideos(data.category)
    });
}

const loadVideoDetails= (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayVideoDetails(data.video))
};

// modal
const displayVideoDetails= (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();   
    const detailsContainer = document.getElementById("details-container");

    detailsContainer.innerHTML=`
   <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
    
    `
};

// {
//     "category_id": "1001",
//     "category": "Music"
// }
function displayCategories(categories) {
    // get the container
    
    const categoryContainer = document.getElementById
    ("category-container");

    // loop operation on Array of object

    for(let cat of categories){
        console.log(cat);
    
    // create Element
     const categoryDiv = document.createElement("div");
     categoryDiv.innerHTML=`
     <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" 
     class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
     `;

    // Append the Element
    categoryContainer.append(categoryDiv);
}
}

// {
//     category_id
// authors
// : 
// Array(1)
// 0
// : 
// {profile_picture: 'https://i.ibb.co/XVHM7NP/kevin.jpg', profile_name: 'Kevin Hart', verified: false}
// length
// : 
// 1
// : 
// "1003"
// description
// : 
// "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, 
// this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs.
//  It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that 
// keeps audiences coming back for more."
// others
// : 
// {views: '1.1K', posted_date: '13885'}
// thumbnail
// : 
// "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg"
// title
// : 
// "Laugh at My Pain"
// video_id
// : 
// "aaac"
// }
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
videoContainer.innerHTML = "";

if (videos.length == 0){
    videoContainer.innerHTML = `
     <div class="col-span-full flex flex-col justify-center items-center py-20 text-center">
        <img class="w-[120px]" src="./assest/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
    </div>
    `
    hideLoader();
    return;
}
    videos.forEach((video)=> {
        console.log(video);
        const videoCard = document.createElement("div");

        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[150px] object-cove"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2">3hrs 56 min ago</span>
            </figure>
            <div class=" flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                    <p class="text-sm text-gray-400 flex gap-1">
                    ${video.authors[0].profile_name}
                    ${video.authors[0].verified == true ?
                        ` <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">`
                         : ``}
                    </p>
                    <p class="text-sm text-gray-400 ">${video.others.views}views</p>
                </div>
              
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
          </div>
        `;

        // append
        videoContainer.append(videoCard);

    });
    hideLoader();
};

document.getElementById('search-input').addEventListener("keyup", (e)=> {
    const input = e.target.value;
    loadVideos(input);
}
)
loadCategories();

