const initialCards = [
  {
    name: "Alien structure in the desert",
    link: "https://images.unsplash.com/photo-1725882176928-8cfdf8000c9a?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Heavily sparking campfire",
    link: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Rainshaft",
    link: "https://images.unsplash.com/photo-1580193813605-a5c78b4ee01a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tornado over a road",
    link: "https://images.unsplash.com/photo-1695605117745-ae4e5d85dfb3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Stairs with lighting",
    link: "https://images.unsplash.com/photo-1589610790171-de1ef1e0ddac?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lightning over an island",
    link: "https://images.unsplash.com/photo-1500674425229-f692875b0ab7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");

const editModal = document.querySelector("#edit-profile-modal");

const modalCloseButton = editModal.querySelector(".modal__close-button");

function openModal() {
  editModal.classList.add("modal__opened");
}

profileEditButton.addEventListener("click", openModal);

function closeModal() {
  editModal.classList.remove("modal__opened");
}

modalCloseButton.addEventListener("click", closeModal);
