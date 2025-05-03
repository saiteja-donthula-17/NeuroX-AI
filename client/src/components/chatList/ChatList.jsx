import { Link, useNavigate, useLocation } from "react-router-dom";
import "./chatList.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOutlineMoreHoriz } from 'react-icons/md'; // Material Design
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for menu toggle
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const ChatList = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isHomepage = location.pathname === "/";
  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = await getToken(); // Get the Clerk token
      const res = await fetch(`${apiUrl}/api/userchats`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      
      return await res.json();
    },
  });
  
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const mutation = useMutation({
    mutationFn: async (id) => {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return await res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats`);
    },
    onError: (err) => {
      console.log("Error:", err);
    },
  });

  const handleMenuOpen = (e, chatId) => {
    setAnchorEl(e.currentTarget);
    setSelectedChatId(chatId);
  }
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChatId(null);
  }

  const handleDelete = () => {
    mutation.mutate(selectedChatId);
    handleMenuClose();
  };

  // Only show menu toggle button if not on homepage
  if (isHomepage) {
    return null;
  }

  return (
    <>
      {/* Menu toggle button - visible on all non-homepage routes */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Overlay when sidebar is active */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      
      <div className={`chatList ${sidebarOpen ? 'active' : ''}`}>
        <span className="title">DASHBOARD</span>
        <Link className="dashboard-items" to="/dashboard">Create a new Chat</Link>
        <Link className="dashboard-items" to="/">Explore Lama AI</Link>
        <Link className="dashboard-items" to="/">Contact</Link>
        <hr />
        <span className="title">RECENT CHATS</span>
        <div className="list">
          {isPending ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((chat) => (
              <div key={chat._id} className="list-item">
                <Link to={`/dashboard/chats/${chat._id}`} className="chat-title">
                  {chat.title}
                </Link>
                <IconButton
                  onClick={(e) => handleMenuOpen(e, chat._id)}
                  className="menu-button"
                  aria-label="Menu"
                >
                  <MdOutlineMoreHoriz className="menu-icon" size={24} />
                </IconButton>
              </div>
            ))
          ) : (
            <p>No chats available</p>
          )}
        </div>

        <Menu 
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        <hr />
        <Link to="/upgrade" className="upgrade">
          <img src="/logo.png" alt="" />
          <div className="texts">
            <span>Upgrade to NeuroX AI Pro</span>
            <span>Get unlimited access to all features</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ChatList;