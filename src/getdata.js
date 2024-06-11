export const getData = ()=>{
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      return (JSON.parse(storedEmployees));
    }
    else{
      return ([]);
    }
}