export const exportChartToPNG = async (chartId: string, filename: string = 'chart.png'): Promise<void> => {
  const chartElement = document.getElementById(chartId);
  if (!chartElement) {
    console.error('Chart element not found');
    return;
  }

  try {
    // Динамический импорт для уменьшения размера бандла
    const html2canvas = (await import('html2canvas')).default;
    
    const canvas = await html2canvas(chartElement, {
      backgroundColor: getComputedStyle(document.documentElement)
        .getPropertyValue('--bg-primary') || '#ffffff',
      scale: 2,
    });
    
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Failed to export chart:', error);
    alert('Не удалось экспортировать график.');
  }
};

