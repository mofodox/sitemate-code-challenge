const confirmModalBtn = document.querySelector(".confirmModalBtn");

confirmModalBtn.addEventListener("click", () => {
  const confirmModalDialog = new ConfirmModalDialog({
    questionText: "Are you sure you want to continue?",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  confirmModalDialog.confirm();
});

class ConfirmModalDialog {
  // By using the destructuring, when we instantiate the class it is more readable so we know
  // what are the parameters and easy to read.
  constructor({ questionText, confirmButtonText, cancelButtonText, root }) {
    this.questionText = questionText || "Are you sure you want to continue?";
    this.confirmButtonText = confirmButtonText || "Yes";
    this.cancelButtonText = cancelButtonText || "Cancel";
    this.root = root || document.body;

    this.modal = undefined;
    this.confirmButton = undefined;
    this.cancelButton = undefined;

    this.createModal();
    this.appendDialogToRoot();
  }

  confirm() {
    if (!this.modal || !this.confirmButton || !this.cancelButton) {
      console.error("Unable to create the modal");
      return;
    }

    this.modal.showModal();

    this.confirmButton.addEventListener("click", () => {
      this.removeDialogFromRoot();
      this.appendTextToBody(`You have clicked on ${this.confirmButtonText}`);
    });

    this.cancelButton.addEventListener("click", () => {
      this.removeDialogFromRoot();
      this.appendTextToBody(`You have clicked on ${this.cancelButtonText}`);
    });
  }

  // create the modal
  createModal() {
    this.modal = document.createElement("dialog");
    this.modal.className = "modalDialog";

    const question = document.createElement("div");
    question.textContent = this.questionText;
    question.className = "question";

    console.log(this.questionText);

    this.modal.appendChild(question);

    const btns = document.createElement("div");
    btns.classList.add("btns");

    this.modal.appendChild(btns);

    this.confirmButton = document.createElement("button");
    this.confirmButton.className = "confirmBtn";
    this.confirmButton.type = "button";
    this.confirmButton.textContent = this.confirmButtonText;

    btns.appendChild(this.confirmButton);

    this.cancelButton = document.createElement("button");
    this.cancelButton.className = "cancelBtn";
    this.cancelButton.type = "button";
    this.cancelButton.textContent = this.cancelButtonText;

    btns.appendChild(this.cancelButton);
  }

  appendDialogToRoot() {
    this.root.appendChild(this.modal);
  }

  removeDialogFromRoot() {
    this.root.removeChild(this.modal);
    delete this;
  }

  appendTextToBody(responseText) {
    const wrapper = document.querySelector(".content-wrapper");
    const responseWrapper = document.createElement("div");

    responseWrapper.className = "responseWrapper";
    responseWrapper.textContent = responseText;
    wrapper.appendChild(responseWrapper);
  }
}
