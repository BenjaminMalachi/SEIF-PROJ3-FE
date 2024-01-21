import React from "react";

function Modal(props) {
  //Props
  const { onDismiss, onCancel, title, message } = props;

  return (
    <>
      <dialog id="commonModal" className="modal">
        <div className="modal" role="dialog" id="commonModal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{message}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={onDismiss}>
                  Ok
                </button>
                {onCancel && (
                  <button className="btn" onClick={onCancel}>
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
