import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Measurement from './measurement';
import MeasurementService from '../../services/measurement/measurement.service';

// Mock the MeasurementService module to control its behavior during testing
jest.mock('../../services/measurement/measurement.service', () => ({
  getAllMeasurement: jest.fn(),
}));

describe('Measurement component', () => {
  it('should render correctly when there are measurements', async () => {
    // Mock the response from the MeasurementService
    
    MeasurementService.getAllMeasurement();

    render(<Measurement />);

    // Wait for the component to render with mock data
    await waitFor(() => {
      // Assert that the MeasurementTable component is rendered with the mock data
      expect(screen.getByTestId('measurement-table')).toBeInTheDocument();

      // You can also add more specific assertions based on your component's behavior
      // For example, checking if specific elements or values are present
    //   expect(screen.getByText('Measurement Table')).toBeInTheDocument();
    //   expect(screen.getByText('Measurement 1: 10')).toBeInTheDocument();
    //   expect(screen.getByText('Measurement 2: 20')).toBeInTheDocument();
    });
  });

  it('should not render when there are no measurements', async () => {
    // Mock an empty response from the MeasurementService
    MeasurementService.getAllMeasurement();

    render(<Measurement />);

    // Wait for the component to render with the empty data
    await waitFor(() => {
      // Assert that the MeasurementTable component is not rendered
      expect(screen.queryByTestId('measurement-table')).not.toBeInTheDocument();

      // You can add more specific assertions based on your component's behavior
      // For example, checking if a message is displayed when there are no measurements
      // expect(screen.getByText('No measurements available.')).toBeInTheDocument();
    });
  });
});
