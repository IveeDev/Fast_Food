import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

// const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: false,
//   user: null,
//   isLoading: true,

//   setIsAuthenticated: (value) => set({ isAuthenticated: value }),
//   setUser: (user) => set({ user }),
//   setLoading: (value) => set({ isLoading: value }),

//   fetchAuthenticatedUser: async () => {
//     set({ isLoading: true });

//     try {
//       const user = await getCurrentUser();
//       console.log("getCurrentUser result:", user);
//       if (user) set({ isAuthenticated: true, user: user as unknown as User });
//       else set({ isAuthenticated: false, user: null });
//     } catch (error) {
//       console.log("fetchAuthenticatedUser error", error as string);
//       set({ isAuthenticated: false, user: null });
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setLoading: (value) => set({ isLoading: value }),

  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    try {
      const appwriteUser = await getCurrentUser();
      console.log("getCurrentUser result:", appwriteUser);
      if (appwriteUser) {
        const user: User = {
          $id: appwriteUser.$id,
          $collectionId: appwriteUser.$collectionId,
          $databaseId: appwriteUser.$databaseId,
          $createdAt: appwriteUser.$createdAt,
          $updatedAt: appwriteUser.$updatedAt,
          $permissions: appwriteUser.$permissions,
          name: appwriteUser.name || "",
          email: appwriteUser.email,
          avatar: appwriteUser.avatar || "",
          $sequence: appwriteUser.$sequence,
        };
        set({ isAuthenticated: true, user });
      } else {
        console.log("No user found from getCurrentUser");
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error("fetchAuthenticatedUser error:", error);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
