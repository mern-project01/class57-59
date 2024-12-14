import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [forntUsers, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  //console.log(forntUsers);
  //handelsubmite
  const handelSubmite = (event) => {
    event.preventDefault();
    const evTarget = event.target;
    const name = evTarget.name.value;
    const email = evTarget.email.value;
    const age = evTarget.age.value;
    const users = {
      name,
      email,
      age,
    }
       // console.log(users);

    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // vaiya aikhane users er jaygay user dise but ami dile hoy nay but jokhoni user ar poriporte users disi kaj korse
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged)
          window.alert('User add sucsesfully')
        evTarget.reset();
      });


  }
  return (
    <>
      <h1 className="text-5xl text-center my-24">
        api facth by express : {forntUsers.length}{" "}
      </h1>
      <div className=" container mx-auto">
        <div className="grid grid-cols-3 gap-2">
          {forntUsers.map((user) => (
            <div className="card bg-primary text-primary-content basis-3 ">
              <div className="card-body">
                <li>id:{user._id} </li>
                <li>name:{user.name} </li>
                <li>email:{user.email} </li>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handelSubmite} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">age</span>
                </label>
                <input
                  type="number"
                  placeholder="age"
                  name="age"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className=" btn btn-outline">submite</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
