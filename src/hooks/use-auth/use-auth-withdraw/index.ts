import { API } from '@/api';

import { useLogout } from '../use-auth-logout';

export const useWithdraw = () => {
  const logout = useLogout();

  const handleWithdraw = async () => {
    try {
      await API.authService.withdraw();
      await logout();
    } catch (error) {
      // 📜 에러 UI 결정나면 변경
      console.error('[WITHDRAW ERROR]', error);
      alert('회원탈퇴에 실패했습니다. 잠시 후에 다시 시도해주세요.');
    }
  };

  return handleWithdraw;
};
