import { NavLink } from "@remix-run/react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        VetSystem
      </div>
      <nav>
        <ul className="sidebar-nav">
          <li className="nav-item">
            <NavLink
              to="/owners"
              className={({ isActive }: { isActive: boolean }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Owners
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/pets"
              className={({ isActive }: { isActive: boolean }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Pets
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/appointments"
              className={({ isActive }: { isActive: boolean }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Appointments
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}