import { ReactElement, useEffect, useState } from "react";
import { UserResponse } from "../../types";

export default function Account(): ReactElement {

  const [data, setData] = useState<UserResponse | null>();

  useEffect(() => {
    const getData = localStorage.getItem('data');
    const parsedData = getData ? JSON.parse(getData) : null;
    setData(parsedData);
  }, []);


  return (
    <div>
      <h1>
        { data?.user?.name }
      </h1>
    </div>
  )
}
