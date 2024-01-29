$(document).ready(function () {
  let isOpen = false;
  const leftSideWidth = $(".left").innerWidth();
  const listHeight = $(".nav-list").innerHeight();

  $(".nav-item").css({ top: `${listHeight}px` });
  getMeals();
  openNav();
  closeNav();

  function closeNav() {
    $(".side-nav").animate({ left: -`${leftSideWidth}` }, 500);
    $(".nav-item").animate({ top: `${listHeight}px` }, 300);

    $(".open-close-btn").attr(
      "class",
      "fa fa-align-justify fs-1 open-close-btn"
    );
    isOpen = false;
  }

  function openNav() {
    $(".side-nav").animate({ left: "0" }, 500);

    $(".nav-item").each(function (index) {
      $(this)
        .delay(index * 20)
        .animate({ top: "0" }, 600 + 100 * index);
    });
    $(".open-close-btn").attr("class", "fa-solid fa-close fs-1 open-close-btn");
    isOpen = true;
  }

  async function getMeals() {
    try {
      let isLoading = true;
      if (isLoading) {
        $(".loader").removeClass("d-none");
        $("body").css({ overflow: "hidden" });
      }

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=`
      );
      const data = await res.json();

      isLoading = false;
      if (!isLoading) {
        $(".loader").addClass("d-none");
        $("body").css({ overflow: "auto" });
      }
      let content = ``;

      for (let i = 0; i < data.meals.length; i++) {
        content += `<div class="col-md-3">
      <div class="meal position-relative">
        <img
          src="${data.meals[i].strMealThumb}"
          alt="Meal"
          class="rounded-3 meal-img"
          id="${data.meals[i].idMeal}" 
        />
        <div
          class="meal-overlay position-absolute bg-white bg-opacity-50 d-flex align-items-center rounded-3" id="${data.meals[i].idMeal}"
        >
          <p class="fs-1 fw-bolder ps-3">${data.meals[i].strMeal}</p>
        </div>
      </div>
    </div>`;
      }
      $(".home-content").prepend(content);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function searchByName(mealName) {
    let isLoading = true;
    if (isLoading) {
      $(".loader").removeClass("d-none");
      $("body").css({ overflow: "hidden" });
    }
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const data = await res.json();

    isLoading = false;
    if (!isLoading) {
      $(".loader").addClass("d-none");
      $("body").css({ overflow: "auto" });
    }
    let content = ``;

    for (let i = 0; i < data.meals.length; i++) {
      content += `<div class="col-md-3">
    <div class="meal position-relative">
      <img
        src="${data.meals[i].strMealThumb}"
        alt="Meal"
        class="rounded-3 meal-img"
        id="${data.meals[i].idMeal}"
      />
      <div
        class="meal-overlay position-absolute bg-white bg-opacity-50 d-flex align-items-center rounded-3"
        id="${data.meals[i].idMeal}"
      >
        <p class="fs-1 fw-bolder ps-3">${data.meals[i].strMeal}</p>
      </div>
    </div>
  </div>`;
    }
    $(".search-content").empty();
    $(".search-content").prepend(content);
  }

  async function searchByLetter(letter) {
    let isLoading = true;
    if (isLoading) {
      $(".loader").removeClass("d-none");
      $("body").css({ overflow: "hidden" });
    }
    if (letter === "") return;
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}
    `
    );
    const data = await res.json();

    isLoading = false;
    if (!isLoading) {
      $(".loader").addClass("d-none");
      $("body").css({ overflow: "auto" });
    }

    let content = ``;

    for (let i = 0; i < data.meals.length; i++) {
      content += `<div class="col-md-3">
    <div class="meal position-relative">
      <img
        src="${data.meals[i].strMealThumb}"
        alt="Meal"
        class="rounded-3 meal-img"
        id="${data.meals[i].idMeal}"
      />
      <div
        class="meal-overlay position-absolute bg-white bg-opacity-50 d-flex align-items-center rounded-3"
        id="${data.meals[i].idMeal}"
      >
        <p class="fs-1 fw-bolder ps-3">${data.meals[i].strMeal}</p>
      </div>
    </div>
  </div>`;
    }
    $(".search-content").empty();
    $(".search-content").prepend(content);
  }

  async function categories() {
    let isLoading = true;
    if (isLoading) {
      $(".loader").removeClass("d-none");
      $("body").css({ overflow: "hidden" });
    }
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const data = await res.json();
    isLoading = false;
    if (!isLoading) {
      $(".loader").addClass("d-none");
      $("body").css({ overflow: "auto" });
    }
    let content = ``;

    for (let i = 0; i < data.categories.length; i++) {
      content += `  <div class="col-md-3">
    <div class="category position-relative">
      <img
        src="${data.categories[i].strCategoryThumb}"
        alt="category"
        class="meal-img rounded-3"
        category='${data.categories[i].strCategory}'
      />
      <div
        class="category-overlay position-absolute bg-white bg-opacity-50 d-flex flex-column text-center rounded-3"
        category='${data.categories[i].strCategory}'
      >
        <p class="fs-1 fw-bolder category-head">${
          data.categories[i].strCategory
        }</p>
        <p class=" fs-4 category-head">
     ${data.categories[i].strCategoryDescription
       .split(" ")
       .slice(0, 20)
       .join(" ")}...
        </p>
      </div>
    </div>
  </div>`;
    }
    $(".category-content").empty();
    $(".category-content").prepend(content);
  }

  async function getAreas() {
    let isLoading = true;
    if (isLoading) {
      $(".loader").removeClass("d-none");
      $("body").css({ overflow: "hidden" });
    }
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list
    `
    );
    const data = await res.json();

    isLoading = false;
    if (!isLoading) {
      $(".loader").addClass("d-none");
      $("body").css({ overflow: "auto" });
    }
    let content = ``;

    for (let i = 0; i < data.meals.length; i++) {
      content += `
    <div class="col-md-3 d-flex flex-column align-items-center area-card" id='${data.meals[i].strArea}'>
      <i class="fa-solid fa-laptop-house text-white area-text"></i>
      <p class="text-white fw-bolder fs-1 area-text">${data.meals[i].strArea}</p>
    </div>
  </div>`;
    }
    $(".area-content").empty();
    $(".area-content").prepend(content);
  }

  async function getIngredients() {
    let isLoading = true;
    if (isLoading) {
      $(".loader").removeClass("d-none");
      $("body").css({ overflow: "hidden" });
    }
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list
    `
    );
    const data = await res.json();

    isLoading = false;
    if (!isLoading) {
      $(".loader").addClass("d-none");
      $("body").css({ overflow: "auto" });
    }

    let content = ``;

    for (let i = 0; i < 20; i++) {
      content += `
    <div class="col-md-3 text-center text-white ing-card" id='${
      data.meals[i].strIngredient
    }'>
            <i class="fa-solid fa-drumstick-bite text-white ing-text"></i>
            <p class="fs-1 fw-bolder ing-text">${
              data.meals[i].strIngredient
            }</p>
            <p class="fs-4 ing-text">
           ${data.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}...
            </p>
          </div>`;
    }
    $(".ingredients-content").empty();
    $(".ingredients-content").prepend(content);
  }

  function nameValidation(userName) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const isNameValid = nameRegex.test(userName);
    $(".error-name").toggleClass("d-none", isNameValid);
    return isNameValid;
  }

  function emailValidation(userEmail) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isEmailValid = emailRegex.test(userEmail);
    $(".error-email").toggleClass("d-none", isEmailValid);
    return isEmailValid;
  }

  function phoneValidation(phone) {
    const isPhoneValid = /^\d{10}$/.test(phone);
    $(".error-phone").toggleClass("d-none", isPhoneValid);
    return isPhoneValid;
  }

  function ageValidation(age) {
    if (age < 1 || age > 99 || isNaN(age)) {
      $(".error-age").removeClass("d-none");
      return false;
    } else {
      $(".error-age").addClass("d-none");
      return true;
    }
  }

  function passwordValidation(password) {
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const isPassValid = passRegex.test(password);
    $(".error-pass").toggleClass("d-none", isPassValid);
    return isPassValid;
  }
  function rePasswordValidation(rePass) {
    const pass = $(".user-pass").val();
    if (pass === rePass) {
      $(".error-re-pass").addClass("d-none");
      return true;
    } else {
      $(".error-re-pass").removeClass("d-none");
    }
  }

  async function showDetails(id) {
    let isLoading = true;
    if (isLoading) {
      $(".loader").removeClass("d-none");
      $("body").css({ overflow: "hidden" });
    }

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();

    isLoading = false;
    if (!isLoading) {
      $(".loader").addClass("d-none");
      $("body").css({ overflow: "auto" });
    }

    const meal = data.meals[0];
    let ingredientsHtml = "";
    let tagsHtml = "";

    if (meal.strTags) {
      const mealTags = meal.strTags.split(",");

      for (let i = 0; i < mealTags.length; i++) {
        tagsHtml += ` <span class="badge tag-badge fw-light fs-4">${mealTags[i]}</span>`;
      }
    }

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient) {
        ingredientsHtml += `
        <span class="badge recipe-badge fw-light fs-4 me-1 mb-1">${measure} ${ingredient}</span>
      `;
      }
    }

    let content = `<div class="col-md-4">
  <img
    src="${data.meals[0].strMealThumb}"
    class="img-description rounded-3"
    alt=""
  />
  <p class="text-white fs-1 fw-bold">${data.meals[0].strMeal}</p>
</div>
<div class="col-md-8 text-white">
  <h2 class="fs-1">Instructions</h2>
  <p class="fs-3">
  ${data.meals[0].strInstructions}
  </p>
  <p class="fs-2 fw-bolder">Area : ${data.meals[0].strArea}</p>
  <p class="fs-2 fw-bolder">Category : ${data.meals[0].strCategory}</p>
  <p class="fs-2 fw-bolder">
    <span class="d-block">Recipes : </span>
  ${ingredientsHtml}
  </p>
  <p class="fs-2 fw-bolder mb-4">
    <span class="d-block">Tags : </span>
    ${tagsHtml}
  </p>

  <a  href=' ${data.meals[0].strSource}' target='_blank'  class="btn btn-success btn-lg fs-4">Source</a>
  <a href=' ${data.meals[0].strYoutube}' target='_blank' class="btn btn-danger btn-lg fs-4">Youtube</a>
</div>`;
    $(".meal-content").empty();
    $(".meal-content").prepend(content);
  }

  async function mealCategory(category) {
    try {
      let isLoading = true;
      if (isLoading) {
        $(".loader").removeClass("d-none");
        $("body").css({ overflow: "hidden" });
      }

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`
      );
      const data = await res.json();

      isLoading = false;
      if (!isLoading) {
        $(".loader").addClass("d-none");
        $("body").css({ overflow: "auto" });
      }

      let content = ``;

      for (let i = 0; i < data.meals.length; i++) {
        content += `<div class="col-md-3">
      <div class="meal position-relative">
        <img
          src="${data.meals[i].strMealThumb}"
          alt="Meal"
          class="rounded-3 meal-img"
          id="${data.meals[i].idMeal}" 
        />
        <div
          class="meal-overlay position-absolute bg-white bg-opacity-50 d-flex align-items-center rounded-3" id="${data.meals[i].idMeal}"
        >
          <p class="fs-1 fw-bolder ps-3">${data.meals[i].strMeal}</p>
        </div>
      </div>
    </div>`;
      }
      $(".home-content").prepend(content);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function mealArea(area) {
    try {
      let isLoading = true;
      if (isLoading) {
        $(".loader").removeClass("d-none");
        $("body").css({ overflow: "hidden" });
      }

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await res.json();

      isLoading = false;
      if (!isLoading) {
        $(".loader").addClass("d-none");
        $("body").css({ overflow: "auto" });
      }

      let content = ``;

      for (let i = 0; i < data.meals.length; i++) {
        content += `<div class="col-md-3">
      <div class="meal position-relative">
        <img
          src="${data.meals[i].strMealThumb}"
          alt="Meal"
          class="rounded-3 meal-img"
          id="${data.meals[i].idMeal}" 
        />
        <div
          class="meal-overlay position-absolute bg-white bg-opacity-50 d-flex align-items-center rounded-3" id="${data.meals[i].idMeal}"
        >
          <p class="fs-1 fw-bolder ps-3">${data.meals[i].strMeal}</p>
        </div>
      </div>
    </div>`;
      }
      $(".areas-meal-content").empty();
      $(".areas-meal-content").prepend(content);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function mealIngredient(ingredient) {
    try {
      let isLoading = true;
      if (isLoading) {
        $(".loader").removeClass("d-none");
        $("body").css({ overflow: "hidden" });
      }
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();

      isLoading = false;
      if (!isLoading) {
        $(".loader").addClass("d-none");
        $("body").css({ overflow: "auto" });
      }

      let content = ``;

      for (let i = 0; i < data.meals.length; i++) {
        content += `<div class="col-md-3">
      <div class="meal position-relative">
        <img
          src="${data.meals[i].strMealThumb}"
          alt="Meal"
          class="rounded-3 meal-img"
          id="${data.meals[i].idMeal}" 
        />
        <div
          class="meal-overlay position-absolute bg-white bg-opacity-50 d-flex align-items-center rounded-3" id="${data.meals[i].idMeal} "
        >
          <p class="fs-1 fw-bolder ps-3">${data.meals[i].strMeal}</p>
        </div>
      </div>
    </div>`;
      }
      $(".ingredients-meal-content").empty();
      $(".ingredients-meal-content").prepend(content);
    } catch (err) {
      console.error(err.message);
    }
  }

  $(".user-input").on("input", function (e) {
    let userName = e.target.value;

    nameValidation(userName);
  });

  $(".user-email").on("input", function (e) {
    let userEmail = e.target.value;

    emailValidation(userEmail);
  });

  $(".user-phone").on("input", function (e) {
    let userPhone = e.target.value;
    phoneValidation(userPhone);
  });

  $(".user-age").on("input", function (e) {
    let userAge = e.target.value;
    ageValidation(userAge);
  });

  $(".user-pass").on("input", function (e) {
    let userPass = e.target.value;
    passwordValidation(userPass);
  });

  $(".user-re-pass").on("input", function (e) {
    let userRePass = e.target.value;
    rePasswordValidation(userRePass);
  });

  $(".open-close-btn").on("click", function () {
    if (!isOpen) {
      openNav();
    } else {
      closeNav();
    }
  });

  $(".search-link").on("click", function () {
    $(".search").removeClass("d-none");
    $(".ingredients").addClass("d-none");
    $(".home").addClass("d-none");
    $(".categories").addClass("d-none");
    $(".contact").addClass("d-none");
    $(".meal-description").addClass("d-none");
    $(".ingredients-meal").addClass("d-none");

    closeNav();
  });

  $(".name-input").on("input", function (e) {
    let mealName = e.target.value;
    searchByName(mealName);
  });

  $(".letter-input").on("input", function (e) {
    let letter = e.target.value;
    searchByLetter(letter);
  });

  $(".category-link").on("click", function () {
    $(".categories").removeClass("d-none");
    $(".search").addClass("d-none");
    $(".home").addClass("d-none");
    $(".ingredients").addClass("d-none");
    $(".ingredients-meal").addClass("d-none");

    $(".contact").addClass("d-none");

    closeNav();
    categories();
  });

  $(".area-link").on("click", function () {
    $(".categories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".home").addClass("d-none");
    $(".contact").addClass("d-none");
    $(".ingredients").addClass("d-none");
    $(".ingredients-meal").addClass("d-none");

    $(".areas").removeClass("d-none");

    closeNav();
    getAreas();
  });

  $(".ingredients-link").on("click", function () {
    $(".categories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".home").addClass("d-none");
    $(".areas").addClass("d-none");
    $(".contact").addClass("d-none");
    $(".ingredients").removeClass("d-none");
    $(".ingredients-meal").addClass("d-none");

    closeNav();
    getIngredients();
  });

  $(".contact-link").on("click", function () {
    $(".categories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".home").addClass("d-none");
    $(".areas").addClass("d-none");
    $(".ingredients").addClass("d-none");
    $(".contact").removeClass("d-none");
    $(".ingredients-meal").addClass("d-none");

    closeNav();
  });

  $(document).on("click", ".meal", function (e) {
    $(".categories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".home").addClass("d-none");
    $(".areas").addClass("d-none");
    $(".contact").addClass("d-none");
    $(".ingredients").addClass("d-none");
    $(".meal-category").addClass("d-none");
    $(".areas-meal").addClass("d-none");
    $(".meal-description").removeClass("d-none");
    $(".ingredients-meal").addClass("d-none");

    const id = $(e.target).attr("id");
    showDetails(id);
  });

  $(document).on("click", ".category", function (e) {
    const category = $(e.target).attr("category");
    mealCategory(category);
    console.log("fsd");
    $(".categories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".home").addClass("d-none");
    $(".areas").addClass("d-none");
    $(".contact").addClass("d-none");
    $(".ingredients").addClass("d-none");
    $(".meal-description").addClass("d-none");
    $(".meal-category").removeClass("d-none");
    $(".ingredients-meal").addClass("d-none");
  });

  $(document).on("click", ".area-card", function (e) {
    const area = $(e.target).attr("id");

    mealArea(area);
    $(".categories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".home").addClass("d-none");
    $(".areas").addClass("d-none");
    $(".contact").addClass("d-none");
    $(".ingredients").addClass("d-none");
    $(".meal-description").addClass("d-none");
    $(".meal-category").addClass("d-none");
    $(".areas-meal").removeClass("d-none");
    $(".ingredients-meal").addClass("d-none");
  });

  $(document).on("click", ".ing-card", function (e) {
    const ing = $(e.target).attr("id");
    console.log(ing);
    mealIngredient(ing);
    $(".categories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".home").addClass("d-none");
    $(".areas").addClass("d-none");
    $(".contact").addClass("d-none");
    $(".ingredients").addClass("d-none");
    $(".meal-description").addClass("d-none");
    $(".meal-category").addClass("d-none");
    $(".areas-meal").addClass("d-none");
    $(".ingredients-meal").removeClass("d-none");
  });
  ///
});
