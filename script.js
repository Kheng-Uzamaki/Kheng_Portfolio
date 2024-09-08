import web from "./web.js";
import programming from "./programming.js";
import project from "./project.js";

$(document).ready(() => {
  function toggleMenu() {
    const $menu = $(".menu-links");
    const $icon = $(".hamburger-icon");
    $menu.toggleClass("open");
    $icon.toggleClass("open");
  }

  const itemsPerPage = 6; // Number of projects per page
  let currentPage = 1;

  function showProjects(page = 1) {
    const $projectCon = $(".container-project");
    $projectCon.empty(); // Clear existing content

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, project.length);

    // Get the subset of projects to display
    const projectsToShow = project.slice(startIndex, endIndex);

    $.each(projectsToShow, (index, p) => {
      const $proContainer = $(`
        <div class="details-container color-container pp">
          <div class="article-container">
            <img src="${p.pro_img}" alt="Project ${p.pro_name}" class="project-img" />
          </div>
          <h2 class="experience-sub-title project-title">${p.pro_name}</h2>
          <p class="project-description">${p.pro_desc}</p>
          <div class="btn-container">
            <button class="btn btn-color-2 project-btn" onclick="window.open('${p.proGit_Url}', '_blank')">Github</button>
      <button class="btn btn-color-2 project-btn" onclick="window.open('${p.pro_liveDemo}', '_blank')">Live Demo</button>
          </div>
        </div>
      `);
      $projectCon.append($proContainer);
    });

    // Update pagination info
    $("#page-info").text(
      `Page ${currentPage} of ${Math.ceil(project.length / itemsPerPage)}`
    );

    // Toggle buttons based on the current page
    $("#prev").prop("disabled", currentPage === 1);
    $("#next").prop(
      "disabled",
      currentPage === Math.ceil(project.length / itemsPerPage)
    );
  }

  // Event handlers for pagination buttons
  $("#prev").click(() => {
    if (currentPage > 1) {
      currentPage--;
      showProjects(currentPage);
    }
  });

  $("#next").click(() => {
    if (currentPage < Math.ceil(project.length / itemsPerPage)) {
      currentPage++;
      showProjects(currentPage);
    }
  });

  // Initial load of projects
  showProjects(currentPage);

  const showWeb = () => {
    const $webDev = $(".webDev-container");
    $webDev.empty(); // Clear existing content
    $.each(web, (index, w) => {
      const $webContainer = $(`
        <article>
          <img src="./assets/checkmark.png" alt="Experience icon" class="icon" />
          <div>
            <h3>${w.lan}</h3>
            <p>${w.exp}</p>
          </div>
        </article>
      `);
      $webDev.append($webContainer);
    });
  };

  const showProgramming = () => {
    const $program = $(".pro-container");
    $program.empty(); // Clear existing content
    $.each(programming, (index, p) => {
      const $proContainer = $(`
        <article>
          <img src="./assets/checkmark.png" alt="Experience icon" class="icon" />
          <div>
            <h3>${p.lan}</h3>
            <p>${p.exp}</p>
          </div>
        </article>
      `);
      $program.append($proContainer);
    });
  };

  // Call functions to display content
  showWeb();
  showProgramming();
});
