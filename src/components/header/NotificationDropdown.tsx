import { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";

const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
];

const mockAppointments = [
  {
    id: 1,
    name: "Ravi Patel",
    email: "ravi@example.com",
    contact_number: "9876543210",
    reason_of_meeting: "Project Discussion",
    your_expectation: "Timeline clarity",
    more_details: "Need to confirm sprint deadlines",
    date: "2025-10-15",
    time: "3:30 PM",
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    view: false,
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    contact_number: "9123456789",
    reason_of_meeting: "Design Feedback",
    your_expectation: "Layout improvements",
    more_details: "Review homepage design updates",
    date: "2025-10-16",
    time: "1:00 PM",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    view: true,
  },
  {
    id: 3,
    name: "Arjun Singh",
    email: "arjun@example.com",
    contact_number: "9090909090",
    reason_of_meeting: "Team Alignment",
    your_expectation: "Weekly progress",
    more_details: "Discuss upcoming sprint priorities",
    date: "2025-10-17",
    time: "10:00 AM",
    createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    view: false,
  },
  {
    id: 4,
    name: "Sneha Jain",
    email: "sneha@example.com",
    contact_number: "9988776655",
    reason_of_meeting: "Marketing Strategy",
    your_expectation: "Campaign clarity",
    more_details: "Discuss social media plan",
    date: "2025-10-17",
    time: "11:00 AM",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    view: false,
  },
];

const NotificationSkeleton = () => (
  <div className="flex items-center justify-between px-4 py-3 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
      <div>
        <div className="h-3 w-28 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-2 w-20 bg-gray-200 dark:bg-gray-600 rounded" />
      </div>
    </div>
    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded" />
  </div>
);

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<typeof mockAppointments>([]);

  const dropdownRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const diffMins = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const getAvatar = (id: number) => avatars[id % avatars.length];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center justify-center h-11 w-11 rounded-full border bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-white"
      >
        {appointments.some((a) => !a.view) && (
          <span className="absolute top-1 right-1 h-2 w-2 bg-orange-400 rounded-full animate-ping" />
        )}
        <Bell size={20} />
      </button>

      {isOpen && (
        <>
         
           <style>{`
            .notification-dropdown {
              position: absolute;
              top: 75px;
              right: 0;
              width: 360px;
              max-height: 480px;
              background-color: white;
              border-radius: 1rem;
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              z-index: 50;
            }
            .notification-dropdown.dark {
              background-color: #1e293b; /* dark-blue background */
            }
            @media (max-width: 820px) {
              .notification-dropdown {
                left: 35%;
                transform: translateX(-24%);
                width: 360px;
                right: auto;
              }
            }
            @media (max-width: 788px) {
              .notification-dropdown {
                transform: translateX(-20%);
                width: 340px;
              }
            }
            @media (max-width: 420px) {
              .notification-dropdown {
                transform: translateX(-24%);
                width: 350px;
                max-width: 260px;
              }
            }
          `}</style>

          <div
            ref={dropdownRef}
            className="notification-dropdown dark:bg-gray-dark"
          >
            <div className="flex justify-between items-center p-4 border-b dark:bg-gray-800 dark:border-gray-700">
              <h5 className="font-semibold text-gray-800 dark:text-white">Notifications</h5>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto dark:bg-gray-dark">
              {loading ? (
                <>
                  <NotificationSkeleton />
                  <NotificationSkeleton />
                  <NotificationSkeleton />
                </>
              ) : appointments.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">No notifications</p>
              ) : (
                appointments.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-blue-950 transition cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={getAvatar(item.id)}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {!item.view && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.reason_of_meeting} • {formatTimeAgo(item.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {appointments.length > 0 && (
              <div className="border-t dark:border-gray-700 dark:bg-gray-800">
                <button
                  onClick={() => alert("View All clicked")}
                  className="w-full py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}






//           <style>{`
          //   .notification-dropdown {
          //     position: absolute;
          //     top: 75px;
          //     right: 0;
          //     width: 360px;
          //     max-height: 480px;
          //     background-color: white;
          //     border-radius: 1rem;
          //     overflow: hidden;
          //     box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          //     z-index: 50;
          //   }
          //   .notification-dropdown.dark {
          //     background-color: #1e293b; /* dark-blue background */
          //   }
          //   @media (max-width: 820px) {
          //     .notification-dropdown {
          //       left: 25%;
          //       transform: translateX(-24%);
          //       width: 360px;
          //       right: auto;
          //     }
          //   }
          //   @media (max-width: 788px) {
          //     .notification-dropdown {
          //       transform: translateX(-20%);
          //       width: 340px;
          //     }
          //   }
          //   @media (max-width: 420px) {
          //     .notification-dropdown {
          //       transform: translateX(-24%);
          //       width: 350px;
          //       max-width: 260px;
          //     }
          //   }
          // `}</style>