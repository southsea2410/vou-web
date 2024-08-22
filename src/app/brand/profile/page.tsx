import BrandNavbar from "../_components/BrandNavbar";

export default function BrandProfilePage() {
  return (
    <div className="min-h-screen">
      <BrandNavbar />
      <div className="flex h-full items-center justify-center bg-background p-4">
        <form className="w-full max-w-lg space-y-4 rounded-md bg-white p-6 shadow-md">
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="rounded-md border border-gray-300 p-2"
              placeholder="Enter full name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="rounded-md border border-gray-300 p-2"
              placeholder="Enter username"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-md border border-gray-300 p-2"
              placeholder="Enter password"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="rounded-md border border-gray-300 p-2"
              placeholder="Enter email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="rounded-md border border-gray-300 p-2"
              placeholder="Enter phone number"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="field" className="text-gray-700">
              Field
            </label>
            <input
              type="text"
              id="field"
              className="rounded-md border border-gray-300 p-2"
              placeholder="Enter field"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="brand" className="text-gray-700">
              Brand Name
            </label>
            <input
              type="text"
              id="brand"
              className="rounded-md border border-gray-300 p-2"
              placeholder="Enter brand name"
            />
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex w-1/2 flex-col">
              <label htmlFor="lat" className="text-gray-700">
                Latitude
              </label>
              <input
                type="number"
                id="lat"
                className="rounded-md border border-gray-300 p-2"
                placeholder="Enter latitude"
              />
            </div>
            <div className="flex w-1/2 flex-col">
              <label htmlFor="lng" className="text-gray-700">
                Longitude
              </label>
              <input
                type="number"
                id="lng"
                className="rounded-md border border-gray-300 p-2"
                placeholder="Enter longitude"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="rounded-md border border-gray-300 p-2"
              placeholder="Enter address"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
