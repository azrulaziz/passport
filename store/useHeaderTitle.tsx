import create, {SetState} from 'zustand'

type HeaderStore = {
    header: string;
    setTitle: (test: string) => void;
  };

export const useHeaderTitle = create((set: SetState<HeaderStore>) => ({
    header: "",
    setTitle: (test) => {
        set({ header: test })
    }
}))

