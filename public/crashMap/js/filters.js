var filters = [
    {
        title: 'Removed By Code',
        fieldName: 'rmvd_by_code'
    },
    {
        title: 'Dispursement Code',
        fieldName: 'dsprsmnt_code'
    },
    {
        title: 'Impounded Code',
        fieldName: 'impndd_code'
    },
    {
        title: 'Route Suffix Code',
        fieldName: 'rt_sfx_code'
    },
    {
        title: 'Direction Code',
        fieldName: 'drctn_code'
    },
    {
        title: 'Hazardous Material Code',
        fieldName: 'hzmt_code'
    },
    {
        title: 'Hazardous Material Placard Text',
        fieldName: 'hzmt_plcrd_text'
    },
    {
        title: 'Record Update Date',
        fieldName: 'rcrd_updt_date'
    },
    {
        title: 'Tire Mark Code',
        fieldName: 'tire_mark_code'
    },
    {
        title: 'Tire Mark Feet Measurement',
        fieldName: 'tire_mrks_ft_meas'
    },
    {
        title: 'Oversized Permit Code',
        fieldName: 'ovrszd_prmt_code'
    },
    {
        title: 'Weight Rating Code',
        fieldName: 'wght_rtng_code'
    },
    {
        title: 'Crash Vehicle Total Code',
        fieldName: 'crash_vehicle_total_code'
    },
    {
        title: 'Sobriety Test Code',
        fieldName: 'sbrty_test_code'
    },
    {
        title: 'Blood Alcohol Number',
        fieldName: 'bld_alchl_num'
    },
    {
        title: 'Alcohol Pending Code',
        fieldName: 'alchl_pndng_code'
    },
    {
        title: 'Multiple Accident Code',
        fieldName: 'mltpl_acdnt_code'
    },
    {
        title: 'Occupant Position Code',
        fieldName: 'ocpnt_pstn_code'
    },
    {
        title: 'Medical Refusal Code',
        fieldName: 'mdcl_rfsl_code'
    },
    {
        title: 'Infant Age',
        fieldName: 'infnt_age'
    },
    {
        title: 'Severity Rating Code',
        fieldName: 'svrty_rtng_code'
    },
    {
        title: 'Year',
        fieldName: 'Year'
    },
    {
        title: 'Case Number',
        fieldName: 'Case Number'
    },
    {
        title: 'Day',
        fieldName: 'Day of Week'
    },
    {
        title: 'Milepost Number',
        fieldName: 'mlpst_num'
    },
    {
        title: 'Route Number ID',
        fieldName: 'stndrd_rt_id'
    },
    {
        title: 'Accident Year',
        fieldName: 'acdnt_yr_num'
    },
    {
        title: 'Accident Case Number',
        fieldName: 'acdnt_case_num'
    },
    {
        title: 'Vehicle ID',
        fieldName: 'vhcl_id'
    },
    {
        title: 'Occupant ID',
        fieldName: 'ocpnt_id'
    },
    {
        title: 'Address ID',
        fieldName: 'adrs_key'
    },
    {
        title: 'Route Suffix Code',
        fieldName: 'rt_sfx_code'
    },
    {
        title: 'Cell Phone Use',
        fieldName: 'cell_phn_use_code'
    },
    {
        title: 'Occupant Age',
        fieldName: 'yrs_age'
    },
    {
        title: 'ID',
        fieldName: 'id'
    },
    {
        title: 'Make',
        fieldName: 'make_text'
    },
    {
        title: 'Location',
        fieldName: 'loc_text'
    },
    {
        title: 'Model',
        fieldName: 'mdl_text'
    },
    {
        title: 'Issuing State',
        fieldName: 'isng_state_abrvtn_code'
    },
    {
        title: 'Identification Number',
        fieldName: 'idntfctn_num'
    },
    {
        title: 'Removed To',
        fieldName: 'rmvd_to_text'
    },
    {
        title: 'Occupants Involved',
        fieldName: 'ocpnts_invlvd_qty'
    },
    {
        title: 'Occupants Killed',
        fieldName: 'ocpnts_klld_qty'
    },
    {
        title: 'Occupants Injured',
        fieldName: 'ocpnts_injrd_qty'
    },
    {
        title: 'State',
        fieldName: 'state_abrvtn_code'
    },
    {
        title: 'Occupants: Killed',
        fieldName: 'killed'
    },
    {
        title: 'Occupants: Incapacitated',
        fieldName: 'incapacitated'
    },
    {
        title: 'Occupants: Moderate Injury',
        fieldName: 'moderateInjury'
    },
    {
        title: 'Occupants: Complaint of Pain',
        fieldName: 'complaintOfPain'
    },
    {
        title: 'Pedestrian: Killed',
        fieldName: 'pedestrianKilled'
    },
    {
        title: 'Pedestrian: Incapacitated',
        fieldName: 'pedestrianIncapacitated'
    },
    {
        title: 'Pedestrian: Moderate Injury',
        fieldName: 'pedestrianModerateInjury'
    },
    {
        title: 'Pedestrian: Complaint of Pain',
        fieldName: 'pedestrianComplaintOfPain'
    },
    {
        title: 'Cross Street',
        fieldName: 'crs_strt_name'
    },
    {
        title: 'At Intersection',
        fieldName: 'crs_strt_intrsctn_code'
    },



  {
      title: 'Severity',
      fieldName: 'Severity Code',
      values: [
        { code: 'F', description: 'Fatality' },
        { code: 'I', description: 'Injury' },
        { code: 'P', description: 'Property Damage Only' },
      ]
  },
  {
      title: 'Alcohol Involved',
      fieldName: 'Alcohol Involved',
      values: [
        { code: 'Y', description: 'Alcohol Involved' },
        { code: 'N', description: 'Alcohol Not Involved' }
      ]
  },
  {
      title: 'Hazardous Materials',
      fieldName: 'Hazardous Materials Involved',
      values: [
        { code: 'Y', description: 'Hazardous Material Involved' },
      ]
  },
  {
      title: 'Vehicle(s) Involved',
      fieldName: 'Total Vehicles Involved',
      values: [
        { code: '1', description: '1 Vehicle' },
        { code: '2', description: '2 Vehicles' },
        { code: '3', description: '3 Vehicles' },
        { code: '4', description: '4 Vehicles' },
        { code: '5', description: '5+ Vehicles' },
      ]
  },
  {
      title: 'Crash Type',
      fieldName: 'Crash Type',
      values: [
        { code: '01', description: 'Same Direction - Rear End' },
        { code: '02', description: 'Same Direction - Sideswipe' },
        { code: '03', description: 'Right Angle' },
        { code: '04', description: 'Opposite Direction (Head On/ Angular)' },
        { code: '05', description: 'Opposite Direction (Sideswipe)' },
        { code: '06', description: 'Struck Parked Vehicle' },
        { code: '07', description: 'Left Turn/U Turn' },
        { code: '08', description: 'Backing' },
        { code: '09', description: 'Encroachment' },
        { code: '10', description: 'Overturned' },
        { code: '11', description: 'Fixed Object' },
        { code: '12', description: 'Animal' },
        { code: '13', description: 'Pedestrian' },
        { code: '14', description: 'Pedalcyclist' },
        { code: '15', description: 'Non-fixed Object' },
        { code: '16', description: 'Railcar - vehicle' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' },
        { code: '20', description: 'Value Unknown' }
      ]
  },
  {
      title: 'Road Condition',
      fieldName: 'Road Surface Code',
      values: [
        { code: '01', description: 'Dry' },
        { code: '02', description: 'Wet' },
        { code: '03', description: 'Snowy' },
        { code: '04', description: 'Icy' },
        { code: '05', description: 'Slush' },
        { code: '06', description: 'Water (Standing/Moving)' },
        { code: '07', description: 'Sand' },
        { code: '08', description: 'Oil' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Physical Condition',
      fieldName: 'Physical Condition',
      values: [
        { code: '01', description: 'Killed' },
        { code: '02', description: 'Incapacitated' },
        { code: '03', description: 'Moderate Injury' },
        { code: '04', description: 'Complaint of Pain' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Driver Physical Status',
      fieldName: 'Driver Physical Status',
      values: [
        { code: '01', description: 'Apparently Normal' },
        { code: '02', description: 'Alcohol Use' },
        { code: '03', description: 'Drug Use (Illicit)' },
        { code: '04', description: 'Medication' },
        { code: '05', description: 'Alcohol & Drug/Medication Use' },
        { code: '06', description: 'Physical Handicaps' },
        { code: '07', description: 'Illness' },
        { code: '08', description: 'Fatigue' },
        { code: '09', description: 'Fell Asleep' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Median Type(s)',
      fieldName: 'Road Median Code',
      values: [
        { code: '01', description: 'Barrier Median' },
        { code: '02', description: 'Curbed Median' },
        { code: '03', description: 'Grass Median' },
        { code: '04', description: 'Painted Median' },
        { code: '05', description: 'None' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Pedestrian/Cyclist Involvement',
      fieldName: 'ped_type_code',
      values: [
        { code: 'P', description: 'Pedestrian Involved' },
        { code: 'C', description: 'Cyclist' }
      ]
  },
  {
      title: 'Traffic Control',
      fieldName: 'Traffic Control Code',
      values: [
        { code: '01', description: 'Police Officer' },
        { code: '02', description: 'RR Watchman' },
        { code: '03', description: 'Traffic Signal' },
        { code: '04', description: 'Lane Markings' },
        { code: '05', description: 'Channelization - Painted' },
        { code: '06', description: 'Channelization - Physical' },
        { code: '07', description: 'Warning Signal' },
        { code: '08', description: 'Stop Sign' },
        { code: '09', description: 'Yield Sign' },
        { code: '10', description: 'Flagman' },
        { code: '11', description: 'No Control Present' },
        { code: '12', description: 'Flashing Traffic Control' },
        { code: '13', description: 'School Zone (Signs/Controls)' },
        { code: '14', description: 'Adult Crossing Guard' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Pre-Crash Action',
      fieldName: 'Pre Crash Type',
      values: [
        { code: '02', description: 'Making Right Turn (not turn on red)' },
        { code: '03', description: 'Making Left Turn' },
        { code: '04', description: 'Making U Turn' },
        { code: '05', description: 'Starting from Parking' },
        { code: '07', description: 'Slowing or Stopping' },
        { code: '14', description: 'Driverless/Moving' },
        { code: '16', description: 'Negotiating Curve' },
        { code: '17', description: 'Driving On Shoulder' },
        { code: '18', description: 'Right Turn On Red' },
        { code: '29', description: 'Other Veh/Cyclist Action *' },
        { code: '32', description: 'Walking To/From School' },
        { code: '33', description: 'Walking/Jogging with Traffic' },
        { code: '34', description: 'Walking/Jogging Against Traffic' },
        { code: '35', description: 'Playing in Road' },
        { code: '44', description: 'Crossing at "unmarked" Crosswalk at Intersection' },
        { code: '45', description: 'Crossing at "marked" Crosswalk at Mid-Block' },
        { code: '46', description: 'Crossing/Jaywalking at Mid-Block' },
        { code: '49', description: 'Other Pedestrian Action *' },
        { code: '00', description: 'Unknown' },
        { code: '01', description: 'Going Straight Ahead' },
        { code: '06', description: 'Starting in Traffic' },
        { code: '08', description: 'Stopped in Traffic' },
        { code: '09', description: 'Parking' },
        { code: '10', description: 'Parked' },
        { code: '11', description: 'Changing Lanes' },
        { code: '12', description: 'Merging/Entering Traffic Lane' },
        { code: '13', description: 'Backing' },
        { code: '15', description: 'Passing' },
        { code: '31', description: 'Pedestrian Off Road' },
        { code: '36', description: 'Standing/Lying/Kneeling in Road' },
        { code: '37', description: 'Getting On/Off Vehicle' },
        { code: '38', description: 'Pushing/Working on Vehicle' },
        { code: '39', description: 'Other Working in Roadway' },
        { code: '40', description: 'Approaching/Leaving Schoolbus' },
        { code: '41', description: 'Coming From Behind Parked Vehicle' },
        { code: '42', description: '(reserved)' },
        { code: '43', description: 'Crossing at "marked" Crosswalk at Intersection' },
        { code: '99', description: 'Other' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Vehicle Type',
      fieldName: 'crash_vehicle_type',
      values: [
        { code: '02', description: 'Passenger Van (< 9 Seats)' },
        { code: '03', description: 'Cargo Van (10K lbs or less)' },
        { code: '04', description: 'Sport Utility Veh' },
        { code: '05', description: 'Pickup' },
        { code: '07', description: 'All Terrain Vehicle' },
        { code: '19', description: 'Other Pass Vehicle' },
        { code: '20', description: 'Single Unit (2 axle)' },
        { code: '21', description: 'Single Unit (3+ axle)' },
        { code: '23', description: 'Single Unit Truck w/Trailer' },
        { code: '29', description: 'Other Truck' },
        { code: '30', description: 'Bus/Large Van (9 or more Seats)' },
        { code: '00', description: 'Unknown' },
        { code: '01', description: 'Car/Station Wagon/ Mini Van' },
        { code: '06', description: 'Recreational Vehicle' },
        { code: '08', description: 'Motorcycle' },
        { code: '09', description: '(reserved)' },
        { code: '10', description: 'any previous w/Trailer' },
        { code: '11', description: 'Moped' },
        { code: '12', description: 'Streetcar/Trolley' },
        { code: '13', description: 'Pedalcycle' },
        { code: '22', description: 'Light Truck w/Trailer' },
        { code: '24', description: 'Truck Tractor (Bobtail)' },
        { code: '25', description: 'Tractor Semi-Trailer' },
        { code: '26', description: 'Tractor Double' },
        { code: '27', description: 'Tractor Triple' },
        { code: '99', description: 'Other' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Initial Clock Point',
      fieldName: 'intl_impct_clckpnt_code',
      values: [
        { code: '01', description: '1 O\'Clock Position' },
        { code: '02', description: '2 O\'Clock Position' },
        { code: '03', description: '3 O\'Clock Position' },
        { code: '04', description: '4 O\'Clock Position' },
        { code: '05', description: '5 O\'Clock Position' },
        { code: '06', description: '6 O\'Clock Position' },
        { code: '07', description: '7 O\'Clock Position' },
        { code: '08', description: '8 O\'Clock Position' },
        { code: '09', description: '9 O\'Clock Position' },
        { code: '10', description: '10 O\'Clock Position' },
        { code: '11', description: '11 O\'Clock Position' },
        { code: '12', description: '12 O\'Clock Position' },
        { code: '13', description: 'Roof' },
        { code: '14', description: 'Undercarriage' },
        { code: '15', description: 'Overturned' },
        { code: '17', description: 'None Visible' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Principal Clock Point',
      fieldName: 'prncpl_dmg_clckpnt_code',
      values: [
        { code: '01', description: '1 O\'Clock Position' },
        { code: '02', description: '2 O\'Clock Position' },
        { code: '03', description: '3 O\'Clock Position' },
        { code: '04', description: '4 O\'Clock Position' },
        { code: '05', description: '5 O\'Clock Position' },
        { code: '06', description: '6 O\'Clock Position' },
        { code: '07', description: '7 O\'Clock Position' },
        { code: '08', description: '8 O\'Clock Position' },
        { code: '09', description: '9 O\'Clock Position' },
        { code: '10', description: '10 O\'Clock Position' },
        { code: '11', description: '11 O\'Clock Position' },
        { code: '12', description: '12 O\'Clock Position' },
        { code: '13', description: 'Roof' },
        { code: '14', description: 'Undercarriage' },
        { code: '15', description: 'Overturned' },
        { code: '17', description: 'None Visible' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Cargo Body Type',
      fieldName: 'Cargo Body',
      values: [
        { code: '01', description: 'Bus (9-15 seats)' },
        { code: '02', description: 'Bus (GT 15 seats)' },
        { code: '03', description: 'Van Enclosed Box' },
        { code: '04', description: 'Cargo Tank' },
        { code: '05', description: 'Flatbed' },
        { code: '06', description: 'Dump' },
        { code: '07', description: 'Concrete Mixer' },
        { code: '08', description: 'Auto Transporter' },
        { code: '09', description: 'Garbage/Refuse' },
        { code: '10', description: 'Hopper (grain/gravel/chips)' },
        { code: '11', description: 'Pole (trailer)' },
        { code: '12', description: 'Intermodal Chassis' },
        { code: '13', description: 'No Cargo Body' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Special Function',
      fieldName: 'Special Vehicle',
      values: [
        { code: '01', description: 'Work Equipment' },
        { code: '02', description: 'Police' },
        { code: '03', description: 'Military' },
        { code: '04', description: 'Fire/Rescue' },
        { code: '05', description: 'Ambulance' },
        { code: '06', description: 'Taxi/Limo' },
        { code: '07', description: 'Veh Used as School Bus' },
        { code: '08', description: 'Veh Used as Other Bus' },
        { code: '09', description: 'School Bus' },
        { code: '10', description: 'Transit Bus' },
        { code: '11', description: 'Other Bus' },
        { code: '12', description: 'Veh Used as Snowplow' },
        { code: '13', description: 'Vehicle Towing Another Veh' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Injury Location',
      fieldName: 'Location Injury',
      values: [
        { code: '01', description: 'Head' },
        { code: '02', description: 'Face' },
        { code: '03', description: 'Eye' },
        { code: '04', description: 'Neck' },
        { code: '05', description: 'Chest' },
        { code: '06', description: 'Back' },
        { code: '07', description: 'Shoulder-Upper Arm' },
        { code: '08', description: 'Elbow/Lower Arm/Hand' },
        { code: '09', description: 'Abdomen/Pelvis' },
        { code: '10', description: 'Hip-Upper Leg' },
        { code: '11', description: 'Knee/Lower Leg/Foot' },
        { code: '12', description: 'Entire Body' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Safety Equipment',
      fieldName: 'Safety Used',
      values: [
        { code: '01', description: 'None' },
        { code: '02', description: 'Lap Belt' },
        { code: '03', description: 'Harness' },
        { code: '04', description: 'Lap Belt & Harness' },
        { code: '05', description: 'Child Restraint' },
        { code: '06', description: 'Helmet' },
        { code: '07', description: '(reserved)' },
        { code: '08', description: 'Airbag' },
        { code: '09', description: 'Airbag & Seat Belts' },
        { code: '10', description: 'Safety Vest (Ped only)' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Environmental Condition',
      fieldName: 'Environmental Condition Code',
      values: [
        { code: '01', description: 'Clear' },
        { code: '02', description: 'Rain' },
        { code: '03', description: 'Snow' },
        { code: '04', description: 'Fog/Smog/Smoke' },
        { code: '05', description: 'Overcast' },
        { code: '06', description: 'Sleet/Hail/Freezing Rain' },
        { code: '07', description: 'Blowing Snow' },
        { code: '08', description: 'Blowing Sand/Dirt' },
        { code: '09', description: 'Severe Crosswinds' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Injury Type',
      fieldName: 'injry_type_code',
      values: [
        { code: '01', description: 'Amputation' },
        { code: '02', description: 'Concussion' },
        { code: '03', description: 'Internal' },
        { code: '04', description: 'Bleeding' },
        { code: '05', description: 'Contusion/Bruise/Abrasion' },
        { code: '06', description: 'Burn' },
        { code: '07', description: 'Fracture/Dislocation' },
        { code: '08', description: 'Complaint of Pain' },
        { code: '12', description: '12 NEW VALUE DEFINITION UNKNOWN' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Gender',
      fieldName: 'gndr_code',
      values: [
        { code: '-50', description: 'NJ REQUIRED - NOT REPORTED' },
        { code: '-5', description: 'NOT AVAILABLE' },
        { code: '-10', description: 'NOT KNOWN' },
        { code: '-15', description: 'NOT REPORTING' },
        { code: '-20', description: 'Not Recorded' },
        { code: '-25', description: 'NOT APPLICABLE' },
        { code: '-99', description: 'INVALID VALUE SUPPLIED' },
        { code: 'F', description: 'Female' },
        { code: 'M', description: 'Male' },
        { code: 'T', description: 'Transgender' },
        { code: 'U', description: 'Unknown' }
      ]
  },
  {
      title: 'Light Condition',
      fieldName: 'Light Condition Code',
      values: [
        { code: '01', description: 'Daylight' },
        { code: '02', description: 'Dawn' },
        { code: '03', description: 'Dusk' },
        { code: '04', description: 'Dark (street lights off)' },
        { code: '05', description: 'Dark (no street lights)' },
        { code: '06', description: 'Dark (street lights on continuous)' },
        { code: '07', description: 'Dark (street lights on spot)' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Airbag Deployment',
      fieldName: 'Airbag Deployed',
      values: [
        { code: '03', description: '03 NEW VALUE DEFINITION UNKNOWN' },
        { code: '04', description: '04 NEW VALUE DEFINITION UNKNOWN' },
        { code: '01', description: 'Front' },
        { code: '02', description: 'Side' },
        { code: '07', description: 'Other' },
        { code: '08', description: 'Multiple' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' },
        { code: '-99', description: 'INVALID VALUE SUPPLIED' }
      ]
  },
  {
      title: 'Road Characteristic',
      fieldName: 'Road Characteristic Code',
      values: [
        { code: '01', description: 'Straight and Level' },
        { code: '02', description: 'Straight and Grade' },
        { code: '03', description: 'Straight and Hillcrest' },
        { code: '04', description: 'Curve and Level' },
        { code: '05', description: 'Curve and Grade' },
        { code: '06', description: 'Curve at Hillcrest' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Vehicle Use',
      fieldName: 'Vehicle Use',
      values: [
        { code: '01', description: 'Personal' },
        { code: '02', description: 'Business/Commerce' },
        { code: '03', description: 'Government' },
        { code: '04', description: 'Responding to Emergency' },
        { code: '05', description: 'Machinery in Use' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' },
      ]
  },
  {
      title: 'Surface Type',
      fieldName: 'Road Surface Code',
      values: [
        { code: '01', description: 'Concrete' },
        { code: '02', description: 'Blacktop' },
        { code: '03', description: 'Gravel' },
        { code: '04', description: 'Steel Grid' },
        { code: '05', description: 'Dirt' },
        { code: '99', description: 'Other' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Traffic Volume',
      fieldName: 'trfc_vlm_code',
      values: [
        { code: '1', description: 'Light' },
        { code: '2', description: 'Moderate' },
        { code: '3', description: 'Heavy' },
        { code: '4', description: 'Very Heavy' },
        { code: '5', description: 'Stop and Go' },
        { code: '6', description: 'Not Known' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Department Type',
      fieldName: 'Department Number',
      values: [
        { code: '01', description: 'Municipal Police' },
        { code: '02', description: 'State Police' },
        { code: '03', description: 'County Police' },
        { code: '04', description: 'Port Authority Police' },
        { code: '99', description: 'Other' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Ejection Type',
      fieldName: 'Ejection',
      values: [
        { code: '01', description: 'Not Ejected' },
        { code: '02', description: 'Partial Ejection' },
        { code: '03', description: 'Ejected' },
        { code: '04', description: 'Trapped' },
        { code: '00', description: 'Unknown' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Ramp Direction',
      fieldName: 'Ramp Direction',
      values: [
        { code: 'NB', description: 'NB NEW VALUE DEFINITION UNKNOWN' },
        { code: 'EB', description: 'EB NEW VALUE DEFINITION UNKNOWN' },
        { code: 'SB', description: 'SB NEW VALUE DEFINITION UNKNOWN' },
        { code: 'WB', description: 'WB NEW VALUE DEFINITION UNKNOWN' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Vehicle Category',
      fieldName: 'Type Code',
      values: [
        { code: '1', description: 'Passenger' },
        { code: '2', description: 'Bus or Truck' },
        { code: '-20', description: 'Not Recorded' },
        { code: '0', description: 'Unknown' }
      ]
  },
  {
      title: 'Off Road Direction',
      fieldName: 'off_rd_code',
      values: [
        { code: 'L', description: 'Left' },
        { code: 'R', description: 'Right' },
        { code: 'C', description: 'Cross Median' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'Sobriety Test Type',
      fieldName: 'Alcohol Test',
      values: [
        { code: 'BL', description: 'Blood' },
        { code: 'BR', description: 'Breath' },
        { code: 'UR', description: 'Urine' },
        { code: '-20', description: 'Not Recorded' }
      ]
  },
  {
      title: 'County',
      fieldName: 'County',
      values: [
        { code: '01', description: 'Atlantic County' },
        { code: '02', description: 'Bergen County' },
        { code: '03', description: 'Burlington County' },
        { code: '04', description: 'Camden County' },
        { code: '05', description: 'Cape May County' },
        { code: '06', description: 'Cumberland County' },
        { code: '07', description: 'Essex County' },
        { code: '08', description: 'Gloucester County' },
        { code: '09', description: 'Hudson County' },
        { code: '10', description: 'Hunterdon County' },
        { code: '11', description: 'Mercer County' },
        { code: '12', description: 'Middlesex County' },
        { code: '13', description: 'Monmouth County' },
        { code: '14', description: 'Morris County' },
        { code: '15', description: 'Ocean County' },
        { code: '16', description: 'Passaic County' },
        { code: '17', description: 'Salem County' },
        { code: '18', description: 'Somerset County' },
        { code: '19', description: 'Sussex County' },
        { code: '20', description: 'Union County' },
        { code: '21', description: 'Warren County' }
      ]
  },
  {
      title: 'Municipality',
      fieldName: 'Municipality',
      values: [
        { code: '0101', description: 'ABSECON CITY' },
        { code: '0102', description: 'ATLANTIC CITY' },
        { code: '0103', description: 'BRIGANTINE CITY' },
        { code: '0104', description: 'BUENA BORO' },
        { code: '0105', description: 'BUENA VISTA TOWNSHIP' },
        { code: '0106', description: 'CORBIN CITY' },
        { code: '0107', description: 'EGG HARBOR CITY' },
        { code: '0108', description: 'EGG HARBOR TOWNSHIP' },
        { code: '0109', description: 'ESTELL MANOR CITY' },
        { code: '0110', description: 'FOLSOM BORO' },
        { code: '0111', description: 'GALLOWAY TOWNSHIP' },
        { code: '0112', description: 'HAMILTON TOWNSHIP' },
        { code: '0113', description: 'HAMMONTON TOWN' },
        { code: '0114', description: 'LINWOOD CITY' },
        { code: '0115', description: 'LONGPORT BORO' },
        { code: '0116', description: 'MARGATE CITY' },
        { code: '0117', description: 'MULLICA TOWNSHIP' },
        { code: '0118', description: 'NORTHFIELD CITY' },
        { code: '0119', description: 'PLEASANTVILLE CITY' },
        { code: '0120', description: 'PORT REPUBLIC CITY' },
        { code: '0121', description: 'SOMERS POINT CITY' },
        { code: '0122', description: 'VENTNOR CITY' },
        { code: '0123', description: 'WEYMOUTH TOWNSHIP' },
        { code: '0201', description: 'ALLENDALE BORO' },
        { code: '0202', description: 'ALPINE BORO' },
        { code: '0203', description: 'BERGENFIELD BORO' },
        { code: '0204', description: 'BOGOTA BORO' },
        { code: '0205', description: 'CARLSTADT BORO' },
        { code: '0206', description: 'CLIFFSIDE PARK BORO' },
        { code: '0207', description: 'CLOSTER BORO' },
        { code: '0208', description: 'CRESSKILL BORO' },
        { code: '0209', description: 'DEMAREST BORO' },
        { code: '0210', description: 'DUMONT BORO' },
        { code: '0211', description: 'ELMWOOD PARK BORO' },
        { code: '0212', description: 'EAST RUTHERFORD BORO' },
        { code: '0213', description: 'EDGEWATER BORO' },
        { code: '0214', description: 'EMERSON BORO' },
        { code: '0215', description: 'ENGLEWOOD CITY' },
        { code: '0216', description: 'ENGLEWOOD CLIFFS BORO' },
        { code: '0217', description: 'FAIR LAWN BORO' },
        { code: '0218', description: 'FAIRVIEW BORO' },
        { code: '0219', description: 'FORT LEE BORO' },
        { code: '0220', description: 'FRANKLIN LAKES BORO' },
        { code: '0221', description: 'GARFIELD CITY' },
        { code: '0222', description: 'GLEN ROCK BORO' },
        { code: '0223', description: 'HACKENSACK CITY' },
        { code: '0224', description: 'HARRINGTON PARK BORO' },
        { code: '0225', description: 'HASBROUCK HEIGHTS BORO' },
        { code: '0226', description: 'HAWORTH BORO' },
        { code: '0227', description: 'HILLSDALE BORO' },
        { code: '0228', description: 'HO HO KUS BORO' },
        { code: '0229', description: 'LEONIA BORO' },
        { code: '0230', description: 'LITTLE FERRY BORO' },
        { code: '0231', description: 'LODI BORO' },
        { code: '0232', description: 'LYNDHURST TOWNSHIP' },
        { code: '0233', description: 'MAHWAH TOWNSHIP' },
        { code: '0234', description: 'MAYWOOD BORO' },
        { code: '0235', description: 'MIDLAND PARK BORO' },
        { code: '0236', description: 'MONTVALE BORO' },
        { code: '0237', description: 'MOONACHIE BORO' },
        { code: '0238', description: 'NEW MILFORD BORO' },
        { code: '0239', description: 'NORTH ARLINGTON BORO' },
        { code: '0240', description: 'NORTHVALE BORO' },
        { code: '0241', description: 'NORWOOD BORO' },
        { code: '0242', description: 'OAKLAND BORO' },
        { code: '0243', description: 'OLD TAPPAN BORO' },
        { code: '0244', description: 'ORADELL BORO' },
        { code: '0245', description: 'PALISADES PARK BORO' },
        { code: '0246', description: 'PARAMUS BORO' },
        { code: '0247', description: 'PARK RIDGE BORO' },
        { code: '0248', description: 'RAMSEY BORO' },
        { code: '0249', description: 'RIDGEFIELD BORO' },
        { code: '0250', description: 'RIDGEFIELD PARK VILLAGE' },
        { code: '0251', description: 'RIDGEWOOD VILLAGE' },
        { code: '0252', description: 'RIVER EDGE BORO' },
        { code: '0253', description: 'RIVER VALE TOWNSHIP' },
        { code: '0254', description: 'ROCHELLE PARK TOWNSHIP' },
        { code: '0255', description: 'ROCKLEIGH BORO' },
        { code: '0256', description: 'RUTHERFORD BORO' },
        { code: '0257', description: 'SADDLE BROOK TOWNSHIP' },
        { code: '0258', description: 'SADDLE RIVER BORO' },
        { code: '0259', description: 'SOUTH HACKENSACK TOWNSHIP' },
        { code: '0260', description: 'TEANECK TOWNSHIP' },
        { code: '0261', description: 'TENAFLY BORO' },
        { code: '0262', description: 'TETERBORO BORO' },
        { code: '0263', description: 'UPPER SADDLE RIVER BORO' },
        { code: '0264', description: 'WALDWICK BORO' },
        { code: '0265', description: 'WALLINGTON BORO' },
        { code: '0266', description: 'WASHINGTON TOWNSHIP' },
        { code: '0267', description: 'WESTWOOD BORO' },
        { code: '0268', description: 'WOODCLIFF LAKE BORO' },
        { code: '0269', description: 'WOOD-RIDGE BORO' },
        { code: '0270', description: 'WYCKOFF TOWNSHIP' },
        { code: '0301', description: 'BASS RIVER TOWNSHIP' },
        { code: '0302', description: 'BEVERLY CITY' },
        { code: '0303', description: 'BORDENTOWN CITY' },
        { code: '0304', description: 'BORDENTOWN TOWNSHIP' },
        { code: '0305', description: 'BURLINGTON CITY' },
        { code: '0306', description: 'BURLINGTON TOWNSHIP' },
        { code: '0307', description: 'CHESTERFIELD TOWNSHIP' },
        { code: '0308', description: 'CINNAMINSON TOWNSHIP' },
        { code: '0309', description: 'DELANCO TOWNSHIP' },
        { code: '0310', description: 'DELRAN TOWNSHIP' },
        { code: '0311', description: 'EASTAMPTON TOWNSHIP' },
        { code: '0312', description: 'EDGEWATER PARK TOWNSHIP' },
        { code: '0313', description: 'EVESHAM TOWNSHIP' },
        { code: '0314', description: 'FIELDSBORO BORO' },
        { code: '0315', description: 'FLORENCE TOWNSHIP' },
        { code: '0316', description: 'HAINESPORT TOWNSHIP' },
        { code: '0317', description: 'LUMBERTON TOWNSHIP' },
        { code: '0318', description: 'MANSFIELD TOWNSHIP' },
        { code: '0319', description: 'MAPLE SHADE TOWNSHIP' },
        { code: '0320', description: 'MEDFORD TOWNSHIP' },
        { code: '0321', description: 'MEDFORD LAKES BORO' },
        { code: '0322', description: 'MOORESTOWN TOWNSHIP' },
        { code: '0323', description: 'MOUNT HOLLY TOWNSHIP' },
        { code: '0324', description: 'MOUNT LAUREL TOWNSHIP' },
        { code: '0325', description: 'NEW HANOVER TOWNSHIP' },
        { code: '0326', description: 'NORTH HANOVER TOWNSHIP' },
        { code: '0327', description: 'PALMYRA BORO' },
        { code: '0328', description: 'PEMBERTON BORO' },
        { code: '0329', description: 'PEMBERTON TOWNSHIP' },
        { code: '0330', description: 'RIVERSIDE TOWNSHIP' },
        { code: '0331', description: 'RIVERTON BORO' },
        { code: '0332', description: 'SHAMONG TOWNSHIP' },
        { code: '0333', description: 'SOUTHAMPTON TOWNSHIP' },
        { code: '0334', description: 'SPRINGFIELD TOWNSHIP' },
        { code: '0335', description: 'TABERNACLE TOWNSHIP' },
        { code: '0336', description: 'WASHINGTON TOWNSHIP' },
        { code: '0337', description: 'WESTAMPTON TOWNSHIP' },
        { code: '0338', description: 'WILLINGBORO TOWNSHIP' },
        { code: '0339', description: 'WOODLAND TOWNSHIP' },
        { code: '0340', description: 'WRIGHTSTOWN BORO' },
        { code: '0401', description: 'AUDUBON BORO' },
        { code: '0402', description: 'AUDUBON PARK BORO' },
        { code: '0403', description: 'BARRINGTON BORO' },
        { code: '0404', description: 'BELLMAWR BORO' },
        { code: '0405', description: 'BERLIN BORO' },
        { code: '0406', description: 'BERLIN TOWNSHIP' },
        { code: '0407', description: 'BROOKLAWN BORO' },
        { code: '0408', description: 'CAMDEN CITY' },
        { code: '0409', description: 'CHERRY HILL TOWNSHIP' },
        { code: '0410', description: 'CHESILHURST BORO' },
        { code: '0411', description: 'CLEMENTON BORO' },
        { code: '0412', description: 'COLLINGSWOOD BORO' },
        { code: '0413', description: 'GIBBSBORO BORO' },
        { code: '0414', description: 'GLOUCESTER CITY' },
        { code: '0415', description: 'GLOUCESTER TOWNSHIP' },
        { code: '0416', description: 'HADDON TOWNSHIP' },
        { code: '0417', description: 'HADDONFIELD BORO' },
        { code: '0418', description: 'HADDON HEIGHTS BORO' },
        { code: '0419', description: 'HI-NELLA BORO' },
        { code: '0420', description: 'LAUREL SPRINGS BORO' },
        { code: '0421', description: 'LAWNSIDE BORO' },
        { code: '0422', description: 'LINDENWOLD BORO' },
        { code: '0423', description: 'MAGNOLIA BORO' },
        { code: '0424', description: 'MERCHANTVILLE BORO' },
        { code: '0425', description: 'MOUNT EPHRIAM BORO' },
        { code: '0426', description: 'OAKLYN BORO' },
        { code: '0427', description: 'PENNSAUKEN TOWNSHIP' },
        { code: '0428', description: 'PINE HILL BORO' },
        { code: '0429', description: 'PINE VALLEY BORO' },
        { code: '0430', description: 'RUNNEMEDE BORO' },
        { code: '0431', description: 'SOMERDALE BORO' },
        { code: '0432', description: 'STRATFORD BORO' },
        { code: '0433', description: 'TAVISTOCK BORO' },
        { code: '0434', description: 'VOORHEES TOWNSHIP' },
        { code: '0435', description: 'WATERFORD TOWNSHIP' },
        { code: '0436', description: 'WINSLOW TOWNSHIP' },
        { code: '0437', description: 'WOODLYNNE BORO' },
        { code: '0501', description: 'AVALON BORO' },
        { code: '0502', description: 'CAPE MAY CITY' },
        { code: '0503', description: 'CAPE MAY POINT BORO' },
        { code: '0504', description: 'DENNIS TOWNSHIP' },
        { code: '0505', description: 'LOWER TOWNSHIP' },
        { code: '0506', description: 'MIDDLE TOWNSHIP' },
        { code: '0507', description: 'NORTH WILDWOOD CITY' },
        { code: '0508', description: 'OCEAN CITY' },
        { code: '0509', description: 'SEA ISLE CITY' },
        { code: '0510', description: 'STONE HARBOR BORO' },
        { code: '0511', description: 'UPPER TOWNSHIP' },
        { code: '0512', description: 'WEST CAPE MAY BORO' },
        { code: '0513', description: 'WEST WILDWOOD BORO' },
        { code: '0514', description: 'WILDWOOD CITY' },
        { code: '0515', description: 'WILDWOOD CREST BORO' },
        { code: '0516', description: 'WOODBINE BORO' },
        { code: '0601', description: 'BRIDGETON CITY' },
        { code: '0602', description: 'COMMERCIAL TOWNSHIP' },
        { code: '0603', description: 'DEERFIELD TOWNSHIP' },
        { code: '0604', description: 'DOWNE TOWNSHIP' },
        { code: '0605', description: 'FAIRFIELD TOWNSHIP' },
        { code: '0606', description: 'GREENWICH TOWNSHIP' },
        { code: '0607', description: 'HOPEWELL TOWNSHIP' },
        { code: '0608', description: 'LAWRENCE TOWNSHIP' },
        { code: '0609', description: 'MAURICE RIVER TOWNSHIP' },
        { code: '0610', description: 'MILLVILLE CITY' },
        { code: '0611', description: 'SHILOH BORO' },
        { code: '0612', description: 'STOW CREEK TOWNSHIP' },
        { code: '0613', description: 'UPPER DEERFIELD TOWNSHIP' },
        { code: '0614', description: 'VINELAND CITY' },
        { code: '0701', description: 'BELLEVILLE TOWNSHIP' },
        { code: '0702', description: 'BLOOMFIELD TOWNSHIP' },
        { code: '0703', description: 'CALDWELL BORO' },
        { code: '0704', description: 'CEDAR GROVE TOWNSHIP' },
        { code: '0705', description: 'EAST ORANGE CITY' },
        { code: '0706', description: 'ESSEX FELLS BORO' },
        { code: '0707', description: 'FAIRFIELD BORO' },
        { code: '0708', description: 'GLEN RIDGE BORO' },
        { code: '0709', description: 'IRVINGTON TOWNSHIP' },
        { code: '0710', description: 'LIVINGSTON TOWNSHIP' },
        { code: '0711', description: 'MAPLEWOOD TOWNSHIP' },
        { code: '0712', description: 'MILLBURN TOWNSHIP' },
        { code: '0713', description: 'MONTCLAIR TOWNSHIP' },
        { code: '0714', description: 'NEWARK CITY' },
        { code: '0715', description: 'NORTH CALDWELL BORO' },
        { code: '0716', description: 'NUTLEY TOWNSHIP' },
        { code: '0717', description: 'ORANGE CITY' },
        { code: '0718', description: 'ROSELAND BORO' },
        { code: '0719', description: 'SOUTH ORANGE VILLAGE TOWNSHIP' },
        { code: '0720', description: 'VERONA TOWNSHIP' },
        { code: '0721', description: 'WEST CALDWELL TOWNSHIP' },
        { code: '0722', description: 'WEST ORANGE TOWNSHIP' },
        { code: '0801', description: 'CLAYTON BORO' },
        { code: '0802', description: 'DEPTFORD TOWNSHIP' },
        { code: '0803', description: 'EAST GREENWICH TOWNSHIP' },
        { code: '0804', description: 'ELK TOWNSHIP' },
        { code: '0805', description: 'FRANKLIN TOWNSHIP' },
        { code: '0806', description: 'GLASSBORO BORO' },
        { code: '0807', description: 'GREENWICH TOWNSHIP' },
        { code: '0808', description: 'HARRISON TOWNSHIP' },
        { code: '0809', description: 'LOGAN TOWNSHIP' },
        { code: '0810', description: 'MANTUA TOWNSHIP' },
        { code: '0811', description: 'MONROE TOWNSHIP' },
        { code: '0812', description: 'NATIONAL PARK BORO' },
        { code: '0813', description: 'NEWFIELD BORO' },
        { code: '0814', description: 'PAULSBORO BORO' },
        { code: '0815', description: 'PITMAN BORO' },
        { code: '0816', description: 'SOUTH HARRISON TOWNSHIP' },
        { code: '0817', description: 'SWEDESBORO BORO' },
        { code: '0818', description: 'WASHINGTON TOWNSHIP' },
        { code: '0819', description: 'WENONAH BORO' },
        { code: '0820', description: 'WEST DEPTFORD TOWNSHIP' },
        { code: '0821', description: 'WESTVILLE BORO' },
        { code: '0822', description: 'WOODBURY CITY' },
        { code: '0823', description: 'WOODBURY HEIGHTS BORO' },
        { code: '0824', description: 'WOOLWICH TOWNSHIP' },
        { code: '0901', description: 'BAYONNE CITY' },
        { code: '0902', description: 'EAST NEWARK BORO' },
        { code: '0903', description: 'GUTTENBERG TOWN' },
        { code: '0904', description: 'HARRISON TOWN' },
        { code: '0905', description: 'HOBOKEN CITY' },
        { code: '0906', description: 'JERSEY CITY' },
        { code: '0907', description: 'KEARNY TOWN' },
        { code: '0908', description: 'NORTH BERGEN TOWNSHIP' },
        { code: '0909', description: 'SECAUCUS TOWN' },
        { code: '0910', description: 'UNION CITY' },
        { code: '0911', description: 'WEEHAWKEN TOWNSHIP' },
        { code: '0912', description: 'WEST NEW YORK TOWN' },
        { code: '1001', description: 'ALEXANDRIA TOWNSHIP' },
        { code: '1002', description: 'BETHLEHEM TOWNSHIP' },
        { code: '1003', description: 'BLOOMSBURY BORO' },
        { code: '1004', description: 'CALIFON BORO' },
        { code: '1005', description: 'CLINTON TOWN' },
        { code: '1006', description: 'CLINTON TOWNSHIP' },
        { code: '1007', description: 'DELAWARE TOWNSHIP' },
        { code: '1008', description: 'EAST AMWELL TOWNSHIP' },
        { code: '1009', description: 'FLEMINGTON BORO' },
        { code: '1010', description: 'FRANKLIN TOWNSHIP' },
        { code: '1011', description: 'FRENCHTOWN BORO' },
        { code: '1012', description: 'GLEN GARDNER BORO' },
        { code: '1013', description: 'HAMPTON BORO' },
        { code: '1014', description: 'HIGH BRIDGE BORO' },
        { code: '1015', description: 'HOLLAND TOWNSHIP' },
        { code: '1016', description: 'KINGWOOD TOWNSHIP' },
        { code: '1017', description: 'LAMBERTVILLE CITY' },
        { code: '1018', description: 'LEBANON BORO' },
        { code: '1019', description: 'LEBANON TOWNSHIP' },
        { code: '1020', description: 'MILFORD TOWNSHIP' },
        { code: '1021', description: 'RARITAN TOWNSHIP' },
        { code: '1022', description: 'READINGTON TOWNSHIP' },
        { code: '1023', description: 'STOCKTON BORO' },
        { code: '1024', description: 'TEWKSBURY TOWNSHIP' },
        { code: '1025', description: 'UNION TOWNSHIP' },
        { code: '1026', description: 'WEST AMWELL TOWNSHIP' },
        { code: '1101', description: 'EAST WINDSOR TOWNSHIP' },
        { code: '1102', description: 'EWING TOWNSHIP' },
        { code: '1103', description: 'HAMILTON TOWNSHIP' },
        { code: '1104', description: 'HIGHTSTOWN BORO' },
        { code: '1105', description: 'HOPEWELL BORO' },
        { code: '1106', description: 'HOPEWELL TOWNSHIP' },
        { code: '1107', description: 'LAWRENCE TOWNSHIP' },
        { code: '1108', description: 'PENNINGTON BORO' },
        { code: '1109', description: 'PRINCETON BORO' },
        { code: '1110', description: 'PRINCETON TOWNSHIP' },
        { code: '1111', description: 'TRENTON CITY' },
        { code: '1112', description: 'ROBBINSVILLE TOWNSHIP' },
        { code: '1113', description: 'WEST WINDSOR TOWNSHIP' },
        { code: '1114', description: 'PRINCETON' },
        { code: '1201', description: 'CARTERET BORO' },
        { code: '1202', description: 'CRANBURY TOWNSHIP' },
        { code: '1203', description: 'DUNELLEN BORO' },
        { code: '1204', description: 'EAST BRUNSWICK TOWNSHIP' },
        { code: '1205', description: 'EDISON TOWNSHIP' },
        { code: '1206', description: 'HELMETTA BORO' },
        { code: '1207', description: 'HIGHLAND PARK BORO' },
        { code: '1208', description: 'JAMESBURG BORO' },
        { code: '1209', description: 'OLD BRIDGE TOWNSHIP' },
        { code: '1210', description: 'METUCHEN BORO' },
        { code: '1211', description: 'MIDDLESEX BORO' },
        { code: '1212', description: 'MILLTOWN BORO' },
        { code: '1213', description: 'MONROE TOWNSHIP' },
        { code: '1214', description: 'NEW BRUNSWICK CITY' },
        { code: '1215', description: 'NORTH BRUNSWICK TOWNSHIP' },
        { code: '1216', description: 'PERTH AMBOY CITY' },
        { code: '1217', description: 'PISCATAWAY TOWNSHIP' },
        { code: '1218', description: 'PLAINSBORO TOWNSHIP' },
        { code: '1219', description: 'SAYREVILLE BORO' },
        { code: '1220', description: 'SOUTH AMBOY CITY' },
        { code: '1221', description: 'SOUTH BRUNSWICK TOWNSHIP' },
        { code: '1222', description: 'SOUTH PLAINFIELD BORO' },
        { code: '1223', description: 'SOUTH RIVER BORO' },
        { code: '1224', description: 'SPOTSWOOD BORO' },
        { code: '1225', description: 'WOODBRIDGE TOWNSHIP' },
        { code: '1301', description: 'ALLENHURST BORO' },
        { code: '1302', description: 'ALLENTOWN BORO' },
        { code: '1303', description: 'ASBURY PARK CITY' },
        { code: '1304', description: 'ATLANTIC HIGHLANDS BORO' },
        { code: '1305', description: 'AVON-BY-THE-SEA BORO' },
        { code: '1306', description: 'BELMAR BORO' },
        { code: '1307', description: 'BRADLEY BEACH BORO' },
        { code: '1308', description: 'BRIELLE BORO' },
        { code: '1309', description: 'COLTS NECK TOWNSHIP' },
        { code: '1310', description: 'DEAL BORO' },
        { code: '1311', description: 'EATONTOWN BORO' },
        { code: '1312', description: 'ENGLISHTOWN BORO' },
        { code: '1313', description: 'FAIR HAVEN BORO' },
        { code: '1314', description: 'FARMINGDALE BORO' },
        { code: '1315', description: 'FREEHOLD BORO' },
        { code: '1316', description: 'FREEHOLD TOWNSHIP' },
        { code: '1317', description: 'HIGHLANDS BORO' },
        { code: '1318', description: 'HOLMDEL TOWNSHIP' },
        { code: '1319', description: 'HOWELL TOWNSHIP' },
        { code: '1320', description: 'INTERLAKEN BORO' },
        { code: '1321', description: 'KEANSBURG BORO' },
        { code: '1322', description: 'KEYPORT BORO' },
        { code: '1323', description: 'LITTLE SILVER BORO' },
        { code: '1324', description: 'LOCH ARBOUR VILLAGE' },
        { code: '1325', description: 'LONG BRANCH CITY' },
        { code: '1326', description: 'MANALAPAN TOWNSHIP' },
        { code: '1327', description: 'MANASQUAN BORO' },
        { code: '1328', description: 'MARLBORO TOWNSHIP' },
        { code: '1329', description: 'MATAWAN BORO' },
        { code: '1330', description: 'ABERDEEN TOWNSHIP' },
        { code: '1331', description: 'MIDDLETOWN TOWNSHIP' },
        { code: '1332', description: 'MILLSTONE TOWNSHIP' },
        { code: '1333', description: 'MONMOUTH BEACH BORO' },
        { code: '1334', description: 'NEPTUNE TOWNSHIP' },
        { code: '1335', description: 'NEPTUNE CITY BORO' },
        { code: '1336', description: 'TINTON FALLS BORO' },
        { code: '1337', description: 'OCEAN TOWNSHIP' },
        { code: '1338', description: 'OCEANPORT BORO' },
        { code: '1339', description: 'HAZLET TOWNSHIP' },
        { code: '1340', description: 'RED BANK BORO' },
        { code: '1341', description: 'ROOSEVELT BORO' },
        { code: '1342', description: 'RUMSON BORO' },
        { code: '1343', description: 'SEA BRIGHT BORO' },
        { code: '1344', description: 'SEA GIRT BORO' },
        { code: '1345', description: 'SHREWSBURY BORO' },
        { code: '1346', description: 'SHREWSBURY TOWNSHIP' },
        { code: '1347', description: 'LAKE COMO BORO' },
        { code: '1348', description: 'SPRING LAKE BORO' },
        { code: '1349', description: 'SPRING LAKE HEIGHTS BORO' },
        { code: '1350', description: 'UNION BEACH BORO' },
        { code: '1351', description: 'UPPER FREEHOLD TOWNSHIP' },
        { code: '1352', description: 'WALL TOWNSHIP' },
        { code: '1353', description: 'WEST LONG BRANCH BORO' },
        { code: '1401', description: 'BOONTON TOWN' },
        { code: '1402', description: 'BOONTON TOWNSHIP' },
        { code: '1403', description: 'BUTLER BORO' },
        { code: '1404', description: 'CHATHAM BORO' },
        { code: '1405', description: 'CHATHAM TOWNSHIP' },
        { code: '1406', description: 'CHESTER BORO' },
        { code: '1407', description: 'CHESTER TOWNSHIP' },
        { code: '1408', description: 'DENVILLE TOWNSHIP' },
        { code: '1409', description: 'DOVER TOWN' },
        { code: '1410', description: 'EAST HANOVER TOWNSHIP' },
        { code: '1411', description: 'FLORHAM PARK BORO' },
        { code: '1412', description: 'HANOVER TOWNSHIP' },
        { code: '1413', description: 'HARDING TOWNSHIP' },
        { code: '1414', description: 'JEFFERSON TOWNSHIP' },
        { code: '1415', description: 'KINNELON BORO' },
        { code: '1416', description: 'LINCOLN PARK BORO' },
        { code: '1417', description: 'MADISON BORO' },
        { code: '1418', description: 'MENDHAM BORO' },
        { code: '1419', description: 'MENDHAM TOWNSHIP' },
        { code: '1420', description: 'MINE HILL TOWNSHIP' },
        { code: '1421', description: 'MONTVILLE TOWNSHIP' },
        { code: '1422', description: 'MORRIS TOWNSHIP' },
        { code: '1423', description: 'MORRIS PLAINS BORO' },
        { code: '1424', description: 'MORRISTOWN TOWN' },
        { code: '1425', description: 'MOUNTAIN LAKES BORO' },
        { code: '1426', description: 'MOUNT ARLINGTON BORO' },
        { code: '1427', description: 'MOUNT OLIVE TOWNSHIP' },
        { code: '1428', description: 'NETCONG BORO' },
        { code: '1429', description: 'PARSIPPANY-TROY HILLS' },
        { code: '1430', description: 'PASSAIC TOWNSHIP' },
        { code: '1431', description: 'PEQUANNOCK TOWNSHIP' },
        { code: '1432', description: 'RANDOLPH TOWNSHIP' },
        { code: '1433', description: 'RIVERDALE BORO' },
        { code: '1434', description: 'ROCKAWAY BORO' },
        { code: '1435', description: 'ROCKAWAY TOWNSHIP' },
        { code: '1436', description: 'ROXBURY TOWNSHIP' },
        { code: '1437', description: 'VICTORY GARDENS BORO' },
        { code: '1438', description: 'WASHINGTON TOWNSHIP' },
        { code: '1439', description: 'WHARTON BORO' },
        { code: '1501', description: 'BARNEGAT LIGHT BORO' },
        { code: '1502', description: 'BAY HEAD BORO' },
        { code: '1503', description: 'BEACH HAVEN BORO' },
        { code: '1504', description: 'BEACHWOOD BORO' },
        { code: '1505', description: 'BERKELEY TOWNSHIP' },
        { code: '1506', description: 'BRICK TOWNSHIP' },
        { code: '1507', description: 'TOMS RIVER TOWNSHIP' },
        { code: '1508', description: 'EAGLESWOOD TOWNSHIP' },
        { code: '1509', description: 'HARVEY CEDARS BORO' },
        { code: '1510', description: 'ISLAND HEIGHTS BORO' },
        { code: '1511', description: 'JACKSON TOWNSHIP' },
        { code: '1512', description: 'LACEY TOWNSHIP' },
        { code: '1513', description: 'LAKEHURST BORO' },
        { code: '1514', description: 'LAKEWOOD TOWNSHIP' },
        { code: '1515', description: 'LAVALLETTE BORO' },
        { code: '1516', description: 'LITTLE EGG HARBOR TOWNSHIP' },
        { code: '1517', description: 'LONG BEACH TOWNSHIP' },
        { code: '1518', description: 'MANCHESTER TOWNSHIP' },
        { code: '1519', description: 'MANTOLOKING BORO' },
        { code: '1520', description: 'OCEAN TOWNSHIP' },
        { code: '1521', description: 'OCEAN GATE BORO' },
        { code: '1522', description: 'PINE BEACH BORO' },
        { code: '1523', description: 'PLUMSTED TOWNSHIP' },
        { code: '1524', description: 'POINT PLEASANT BORO' },
        { code: '1525', description: 'PT PLEASANT BEACH BORO' },
        { code: '1526', description: 'SEASIDE HEIGHTS BORO' },
        { code: '1527', description: 'SEASIDE PARK BORO' },
        { code: '1528', description: 'SHIP BOTTOM BORO' },
        { code: '1529', description: 'SOUTH TOMS RIVER BORO' },
        { code: '1530', description: 'STAFFORD TOWNSHIP' },
        { code: '1531', description: 'SURF CITY BORO' },
        { code: '1532', description: 'TUCKERTON BORO' },
        { code: '1533', description: 'BARNEGAT TOWNSHIP' },
        { code: '1601', description: 'BLOOMINGDALE BORO' },
        { code: '1602', description: 'CLIFTON CITY' },
        { code: '1603', description: 'HALEDON BORO' },
        { code: '1604', description: 'HAWTHORNE BORO' },
        { code: '1605', description: 'LITTLE FALLS TOWNSHIP' },
        { code: '1606', description: 'NORTH HALEDON BORO' },
        { code: '1607', description: 'PASSAIC CITY' },
        { code: '1608', description: 'PATERSON CITY' },
        { code: '1609', description: 'POMPTON LAKES BORO' },
        { code: '1610', description: 'PROSPECT PARK BORO' },
        { code: '1611', description: 'RINGWOOD BORO' },
        { code: '1612', description: 'TOTOWA BORO' },
        { code: '1613', description: 'WANAQUE BORO' },
        { code: '1614', description: 'WAYNE TOWNSHIP' },
        { code: '1615', description: 'WEST MILFORD TOWNSHIP' },
        { code: '1616', description: 'WOODLAND PARK BORO' },
        { code: '1701', description: 'ALLOWAY TOWNSHIP' },
        { code: '1702', description: 'ELMER BORO' },
        { code: '1703', description: 'ELSINBORO TOWNSHIP' },
        { code: '1704', description: 'LOWER ALLOWAYS CRK TOWNSHIP' },
        { code: '1705', description: 'MANNINGTON TOWNSHIP' },
        { code: '1706', description: 'OLDMANS TOWNSHIP' },
        { code: '1707', description: 'PENNS GROVE BORO' },
        { code: '1708', description: 'PENNSVILLE TOWNSHIP' },
        { code: '1709', description: 'PILESGROVE TOWNSHIP' },
        { code: '1710', description: 'PITTSGROVE TOWNSHIP' },
        { code: '1711', description: 'QUINTON TOWNSHIP' },
        { code: '1712', description: 'SALEM CITY' },
        { code: '1713', description: 'CARNEYS POINT TOWNSHIP' },
        { code: '1714', description: 'UPPER PITTSGROVE TOWNSHIP' },
        { code: '1715', description: 'WOODSTOWN BORO' },
        { code: '1801', description: 'BEDMINSTER TOWNSHIP' },
        { code: '1802', description: 'BERNARDS TOWNSHIP' },
        { code: '1803', description: 'BERNARDSVILLE BORO' },
        { code: '1804', description: 'BOUND BROOK BORO' },
        { code: '1805', description: 'BRANCHBURG TOWNSHIP' },
        { code: '1806', description: 'BRIDGEWATER TOWNSHIP' },
        { code: '1807', description: 'FAR HILLS BORO' },
        { code: '1808', description: 'FRANKLIN TOWNSHIP' },
        { code: '1809', description: 'GREEN BROOK TOWNSHIP' },
        { code: '1810', description: 'HILLSBOROUGH TOWNSHIP' },
        { code: '1811', description: 'MANVILLE BORO' },
        { code: '1812', description: 'MILLSTONE BORO' },
        { code: '1813', description: 'MONTGOMERY TOWNSHIP' },
        { code: '1814', description: 'NORTH PLAINFIELD BORO' },
        { code: '1815', description: 'PEAPACK-GLADSTONE BORO' },
        { code: '1816', description: 'RARITAN BORO' },
        { code: '1817', description: 'ROCKY HILL BORO' },
        { code: '1818', description: 'SOMERVILLE BORO' },
        { code: '1819', description: 'SOUTH BOUND BROOK BORO' },
        { code: '1820', description: 'WARREN TOWNSHIP' },
        { code: '1821', description: 'WATCHUNG BORO' },
        { code: '1901', description: 'ANDOVER BORO' },
        { code: '1902', description: 'ANDOVER TOWNSHIP' },
        { code: '1903', description: 'BRANCHVILLE BORO' },
        { code: '1904', description: 'BYRAM TOWNSHIP' },
        { code: '1905', description: 'FRANKFORD TOWNSHIP' },
        { code: '1906', description: 'FRANKLIN BORO' },
        { code: '1907', description: 'FREDON TOWNSHIP' },
        { code: '1908', description: 'GREEN TOWNSHIP' },
        { code: '1909', description: 'HAMBURG BORO' },
        { code: '1910', description: 'HAMPTON TOWNSHIP' },
        { code: '1911', description: 'HARDYSTON TOWNSHIP' },
        { code: '1912', description: 'HOPATCONG BORO' },
        { code: '1913', description: 'LAFAYETTE TOWNSHIP' },
        { code: '1914', description: 'MONTAGUE TOWNSHIP' },
        { code: '1915', description: 'NEWTON TOWN' },
        { code: '1916', description: 'OGDENSBURG BORO' },
        { code: '1917', description: 'SANDVSTON TOWNSHIP' },
        { code: '1918', description: 'SPARTA TOWNSHIP' },
        { code: '1919', description: 'STANHOPE BORO' },
        { code: '1920', description: 'STILLWATER TOWNSHIP' },
        { code: '1921', description: 'SUSSEX BORO' },
        { code: '1922', description: 'VERNON TOWNSHIP' },
        { code: '1923', description: 'WALPACK TOWNSHIP' },
        { code: '1924', description: 'WANTAGE TOWNSHIP' },
        { code: '2001', description: 'BERKELEY HEIGHTS TOWNSHIP' },
        { code: '2002', description: 'CLARK TOWNSHIP' },
        { code: '2003', description: 'CRANFORD TOWNSHIP' },
        { code: '2004', description: 'ELIZABETH CITY' },
        { code: '2005', description: 'FANWOOD BORO' },
        { code: '2006', description: 'GARWOOD BORO' },
        { code: '2007', description: 'HILLSIDE TOWNSHIP' },
        { code: '2008', description: 'KENILWORTH BORO' },
        { code: '2009', description: 'LINDEN CITY' },
        { code: '2010', description: 'MOUNTAINSIDE BORO' },
        { code: '2011', description: 'NEW PROVIDENCE BORO' },
        { code: '2012', description: 'PLAINFIELD CITY' },
        { code: '2013', description: 'RAHWAY CITY' },
        { code: '2014', description: 'ROSELLE BORO' },
        { code: '2015', description: 'ROSELLE PARK BORO' },
        { code: '2016', description: 'SCOTCH PLAINS TOWNSHIP' },
        { code: '2017', description: 'SPRINGFIELD TOWNSHIP' },
        { code: '2018', description: 'SUMMIT CITY' },
        { code: '2019', description: 'UNION TOWNSHIP' },
        { code: '2020', description: 'WESTFIELD TOWN' },
        { code: '2021', description: 'WINFIELD TOWNSHIP' },
        { code: '2101', description: 'ALLAMUCHY TOWNSHIP' },
        { code: '2102', description: 'ALPHA BORO' },
        { code: '2103', description: 'BELVIDERE TOWN' },
        { code: '2104', description: 'BLAIRSTOWN TOWNSHIP' },
        { code: '2105', description: 'FRANKLIN TOWNSHIP' },
        { code: '2106', description: 'FRELINGHUYSEN TOWNSHIP' },
        { code: '2107', description: 'GREENWICH TOWNSHIP' },
        { code: '2108', description: 'HACKETTSTOWN TOWN' },
        { code: '2109', description: 'HARDWICK TOWNSHIP' },
        { code: '2110', description: 'HARMONY TOWNSHIP' },
        { code: '2111', description: 'HOPE TOWNSHIP' },
        { code: '2112', description: 'INDEPENDENCE TOWNSHIP' },
        { code: '2113', description: 'KNOWLTON TOWNSHIP' },
        { code: '2114', description: 'LIBERTY TOWNSHIP' },
        { code: '2115', description: 'LOPATCONG TOWNSHIP' },
        { code: '2116', description: 'MANSFIELD TOWNSHIP' },
        { code: '2117', description: 'OXFORD TOWNSHIP' },
        { code: '2118', description: 'PAHAQUARRY TOWNSHIP' },
        { code: '2119', description: 'PHILLIPSBURG TOWN' },
        { code: '2120', description: 'POHATCONG TOWNSHIP' },
        { code: '2121', description: 'WASHINGTON BORO' },
        { code: '2122', description: 'WASHINGTON TOWNSHIP' },
        { code: '2123', description: 'WHITE TOWNSHIP' }
      ]
  }
];

// converts table fields into proper titles and codes into actual descriptions
var convertTableCodes = function (filterStruct, valueStruct) {
    var countyCode;
    for (i = 0; i < valueStruct.length; i++) {
        for (j = 0; j < filterStruct.length; j++) {
            if (filterStruct[j].fieldName === valueStruct[i].field) {
                valueStruct[i].field = filterStruct[j].title;
                if (valueStruct[i].field === 'County') {
                    countyCode = valueStruct[i].value
                }
                if (valueStruct[i].field === 'Municipality') {
                    valueStruct[i].value = countyCode + valueStruct[i].value
                }
                if (typeof (filterStruct[j].values) === 'undefined') { }
                else {
                    for (k = 0; k < filterStruct[j].values.length; k++) {
                        if (valueStruct[i].value === filterStruct[j].values[k].code) {
                            valueStruct[i].value = filterStruct[j].values[k].description;
                        }
                    }
                }
            }
        }
    }
}

var convertCodeDescription = function (filterStruct, codeName, codeNumber) {
    if (codeName !== 'yr_num' && codeName !== 'acc_dow') {
        for (i = 0; i < filterStruct.length; i++) {
            if (filterStruct[i].fieldName === codeName) {
                for (j = 0; j < filterStruct[i].values.length; j++) {
                    if (filterStruct[i].values[j].code === codeNumber) {
                        return filterStruct[i].values[j].description;
                    }
                }
            }
        }
    }

}
