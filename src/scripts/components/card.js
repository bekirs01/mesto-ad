export const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export const deleteCard = (cardElement) => {
  cardElement.remove();
};

const getTemplate = () => {
  return document
    .getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export const createCardElement = (
  data,
  { onPreviewPicture, onLikeIcon, onDeleteCard, currentUserId }
) => {
  const cardElement = getTemplate();
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__control-button_type_delete");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  // ✅ Silme ikonunu sadece sahibi görsün
  if (data.owner && data.owner._id !== currentUserId) {
    deleteButton.remove();
  }

  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  // ✅ Like sayısı
  if (likeCountElement) {
    likeCountElement.textContent = data.likes ? data.likes.length : 0;
  }

  // ✅ Kullanıcı daha önce like attıysa aktif başlasın
  const isAlreadyLiked =
    data.likes && data.likes.some((user) => user._id === currentUserId);

  if (isAlreadyLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (onLikeIcon) {
    likeButton.addEventListener("click", () =>
      onLikeIcon(data._id, likeButton, likeCountElement)
    );
  }

  if (onDeleteCard && deleteButton && (!data.owner || data.owner._id === currentUserId)) {
    deleteButton.addEventListener("click", () => onDeleteCard(data._id, cardElement));
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () =>
      onPreviewPicture({ name: data.name, link: data.link })
    );
  }

  return cardElement;
};
