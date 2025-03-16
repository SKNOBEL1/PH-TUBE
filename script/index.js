console.log("index is connected");

function removeActiveClass() {
    const activeButtons= document.getElementsByClassName("active");
}
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

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) =>  displayVideos(data.videos));
    // { removeActiveClass();
    //      document.getElementById("btn-all").classList.add("active");}
}

const loadCategoryVideos = (id) => {
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
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">
                    </p>
                    <p class="text-sm text-gray-400 ">${video.others.views}views</p>
                </div>
              
            </div
          </div>
        `;

        // append
        videoContainer.append(videoCard);

    });
};

loadCategories();

