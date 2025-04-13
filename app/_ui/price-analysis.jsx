import { useEffect } from "react";
import { useState } from "react";
export default function PriceAnalysis(){

    const [state, action, pending] = useActionState(getPriceAnalysis, undefined);
 
    // effect to replace form with price analysis data
    useEffect(() => {
        if (state?.success) {
    
          return () => console.log("Price Analysis Got"); // cleanup in case component unmounts
        }
      }, [state, router]);
    


    return(
        <div>
            <form action = {action}>
                <div>
                <label
                className=""
                htmlFor="itemName"
                >
                    Item Name:
                </label>
                <input
                    className=""
                    id = "itemName"
                    name = "itemName"
                    type = "text"
                    required
                />
                </div>
                <div>
                    <button
                    className=""
                    disabled ={pending}
                    type="submit"
                    >
                        {pending ? "Analyzing..." : "Get Price Analysis"}
                    </button>
                </div>
            </form>
        </div>
    );
}