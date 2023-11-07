$(document).ready(function () {
  const form = $("#menti-form");
  const container = $("#menti-container");
  const nameEl = $("#menti-name");
  const titleEl = $("#slide-title");
  const imageEl = $("#menti-image");
  const choicesEl = $("#menti-choices");
  const prevBtn = $("#prev-slide");
  const nextBtn = $("#next-slide");
  let currentSlide = 0;
  let slides = [];

  function showSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex > slides.length - 1) return;

    currentSlide = slideIndex;
    prevBtn.prop("disabled", currentSlide === 0);
    nextBtn.prop("disabled", currentSlide === slides.length - 1);
    titleEl.text(slides[currentSlide].title);
    imageEl.attr("src", slides[currentSlide].image);
    if (slides[currentSlide].type === "quiz") {
      const choices = slides[currentSlide].choices;
      choicesEl.html("");
      choices.forEach((choice) => {
        const choiceEl = $("<div></div>");
        choiceEl.text(choice);
        choicesEl.append(choiceEl);
      });
    } else {
      choicesEl.html("");
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPrevSlide() {
    showSlide(currentSlide - 1);
  }

  form.on("submit", async (event) => {
    event.preventDefault();
    const code = $("#menti-code").val().replace(/\s/g, "");
    const response = await fetch(`/menti/${code}`);
    const data = await response.json();
    nameEl.text(data.name);
    slides = data.slides;
    showSlide(0);
    container.css("display", "block");
    form.addClass("hidden");
    if (slides.length > 1) {
      $(document).on("keydown", function (event) {
        if (event.which === 37) {
          showPrevSlide();
        } else if (event.which === 39) {
          showNextSlide();
        }
      });
    }
  });

  prevBtn.on("click", showPrevSlide);

  nextBtn.on("click", showNextSlide);
});
