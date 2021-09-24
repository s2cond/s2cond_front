const setBorderColor = (status: string) => {
  if (status === 'lookingJob') return 'border-s2condPurple';
  if (status === 'preparingMove') return 'border-s2condPink';
  if (status === 'proNjob') return 'border-s2condOrange';
  return 'border-borderGray';
};

export default setBorderColor;
