import useSWR from 'swr';
import studentConfigurationApi from '../apis/student/student-config.api';

export const SWR_KEY_STUDENT_CONFIGURE = 'studentConfigure';

export default () => {
  const { data, error, mutate } = useSWR(
    SWR_KEY_STUDENT_CONFIGURE,
    studentConfigurationApi.get,
    {
      revalidateOnMount: true,
    },
  );

  const isLoading = !data && !error;

  return {
    isLoading,
    configure: data,
    getStudentConfigure: mutate,
  };
};
