'use client'
import Image from "next/image";
import Link from "next/link";
import logo from '../images/image 6.png'
import { BriefcaseBusiness, Newspaper, TicketsPlane } from "lucide-react";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    handleClose();
    router.push("/");
  };

  return (
    <header className="w-full border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center">
              <Image src={logo} alt="logo" />
            </div>
            <span className="font-bold text-lg tracking-wide">
              КАПИТАЛ-Т
            </span>
          </div>
          <nav className="md:flex items-center gap-8 hidden">
            <Link href={"/news"} className="flex items-center gap-[10px] active:text-[#FFA900] font-semibold">
              <Newspaper />
              <span>Новости</span>
            </Link>
            <Link href={"/vacancy"} className="flex items-center gap-[10px] active:text-[#FFA900] font-semibold">
              <BriefcaseBusiness />
              <span>Вакансии</span>
            </Link>
            <Link href={"/report"} className="flex items-center gap-[10px] active:text-[#FFA900] font-semibold">
              <TicketsPlane />
              <span>Заявки</span>
            </Link>
          </nav>
          <div className="cursor-pointer transition">
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircleOutlinedIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header >
  )
}
