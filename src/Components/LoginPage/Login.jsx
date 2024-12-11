import './App.css';

function App() {
  return (
    <section className="bgform">
      <div className="flex">
       
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="head">
              Sign in to your account
            </h1>
            <p>Please enter your details.</p>
            <form className="loginform" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="emailholder"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="passwordplaceholder"
                />
              </div>
              <div class="align">
  <div>
    <input type="checkbox" id="remember" class="remembercheckbox" />
  </div>
  <div>
    <label for="remember" class="remember">Remember me</label>
  </div>
  <div>
    <a href="#" class="forgotpass">Forgot password?</a>
  </div>
</div>

              <button
                type="submit"
                className="submit-btn"
                
              >
                <a href='my-app/src/Manager/app.jsx'></a>
                Sign in
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Loginf;
