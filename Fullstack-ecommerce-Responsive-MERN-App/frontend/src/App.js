import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      try {
        const res = await fetch(`http://localhost:8080/product`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const resData = await res.json();
        dispatch(setDataProduct(resData));
      } catch (error) {
        // Handle the error, you can log, notify the user, or use toast messages
        console.error("Error fetching product data:", error);
        toast.error("Failed to fetch product data");
      }
    })();
  },[dispatch])

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
