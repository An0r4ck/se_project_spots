import "./index.css";
import {
  enableValidation,
  resetValidation,
  settings,
} from "../scripts/validation.js";

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

// Profile Elements
const profileEditButton = document.querySelector(".profile__edit-button");
const cardModalButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Form elements
const editModal = document.querySelector("#edit-profile-modal");
const profileCloseButton = editModal.querySelector(".modal__close-button");
const editFormElement = document.forms["edit-profile"];
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitButton = cardModal.querySelector(".modal__submit-button");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button");
const cardCaptionInput = cardModal.querySelector("#add-card-caption-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button_type_preview"
);

// Card elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// Creates more card templates depending on objects present in the array
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

// Adds the modal_opened class to whatever this function is connected to
function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", closeModalOnOverlay);
  document.addEventListener("keydown", closeModalOnEsc);
}

// Removes the modal_opened class from whatever this function is connected to
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", closeModalOnOverlay);
  document.removeEventListener("keydown", closeModalOnEsc);
}

// Makes the close button in the forms act as an exit for them
previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

// Function for closing a form if you click outside the form's borders
function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

// Function for closing a form if you press Esc
function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

// Allows for editing profile section by submitting info to the connected form
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  evt.target.reset();
  closeModal(editModal);
}

// Allows for creating a new card/new post by submitting info to the connected form
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(cardCaptionInput.value);
  console.log(cardLinkInput.value);
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitButton, settings);
  closeModal(cardModal);
}

// All functionality for the form that opens when you click "Edit Profile"
profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  openModal(editModal);
});
profileCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});
editFormElement.addEventListener("submit", handleEditFormSubmit);

// All functionality for the form that opens when you click "+ New Post"
cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});
cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});
editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

// Adds cards to the page from the above array
initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});

enableValidation(settings);
