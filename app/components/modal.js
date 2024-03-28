'use client';

export default function Modal({ btnText, title, message }) {
    return(
        <>
            <button className="btn btn-primary btn-wide" onClick={()=>document.getElementById('my_modal').showModal()}>{btnText}</button>
            <dialog id="my_modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
        </>
    )
}