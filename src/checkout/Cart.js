import CloseOverlay from "../icons/close.svg";

function Cart({ isVisisble, setCartVisisble }) {
  return (
    <div
      className={`
        ${isVisisble ? "" : "opacity-0 pointer-events-none"}
        transition-opaciy
        duration-500
        absolute top-0 right-0 z-[9999] w-full h-screen bg-[#121618dd]
        lg:w-1/4
      `}
    >
      <button
        onClick={() => setCartVisisble(false)}
        className="absolute top-5 left-5"
      >
        <img className="w-[25px]" src={CloseOverlay} alt="close overlay" />
      </button>
    </div>
  );
}

export default Cart;
