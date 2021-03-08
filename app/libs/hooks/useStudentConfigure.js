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

  function getClassName(classId) {
    if (data) {
      const { classes } = data;
      if (classes) {
        return classes.find(t => t.id === classId)?.name || '';
      }
    }

    return '';
  }

  function getBusRoute(busRouteId) {
    if (data) {
      const { busRoutes } = data;
      if (busRoutes && busRoutes.length) {
        return busRoutes.find(t => t.id === busRouteId)?.name || '';
      }
    }

    return '';
  }

  return {
    isLoading,
    getClassName,
    configure: data || {},
    getStudentConfigure: mutate,
    getBusRoute,
  };
};
