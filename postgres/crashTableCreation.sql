-- Table: public.crash

DROP TABLE public.crash;

CREATE TABLE public.crash
(
    internal_id serial primary key,
    HSMV text,
    EventCrashDate text,
    EventCrashTime text,
    EventOnStreet text,
    EventCrossStreet text,
    EventDD_X text,
    EventDD_Y text,
    EventSource_XY text,
    EventNodeDescription text,
    EventCounty text,
    TotalFatalities text,
    TotalInjuries text,
    HighestSeverity text,
    Fatal text,
    Incapacitating text,
    NonIncapacitating text,
    PossibleInjury text,
    Pedestrian text,
    Bike text,
    Intoxication text,
    Speeding text,
    DisregardControl text,
    WorkZone text,
    NoLighting text,
    SHSP_VulnerableUser text,
    SHSP_AgrDriving text,
    SHSP_LaneDeparture text,
    SHSP_Intersetion text,
    Veh1AgeCatagory1 text,
    Veh1AgeCatagory2 text,
    Angle text,
    RearEnd text,
    LeftTurn text,
    RightTurn text,
    HeadOn text,
    Sideswipe text,
    SignalizeStop text,
    CloseMedian text,
    ProtectetLeftTurn text,
    AccessMgmtReview text,
    RoadFriction text,
    RunOffRoad text,
    HeavyTruck text,
    Prohibit_UTurns text,
    MotorCycle text,
    CuveSignage text,
    UnpavedShoulder text,
    NonTypicalGeometry text,
    AnimalInvolved text,
    ElectronicDistraction text,
    SegmentID text,
    AADT text,
    CD_Main text,
    CD_Link text,
    CD_Edit text,
    CD_Symbology text,
    GID text,
    EventCrashNode text,
    EventCrashYear text,
    EventCrashDay text,
    EventCrashMonth text,
    EventCrashHour text,
    EventAddress text,
    EventCityCode text,
    EventJurisdiction text,
    EventRoadwayID text,
    EventMP text,
    EventDirectionFmInt text,
    EventDistanceFmInt text,
    EventRelationtoIntersection text,
    EventImpactType text,
    EventNonVehicularCollision text,
    EventHitandRun text,
    EventLocationOnRoadway text,
    EventLightingCondition text,
    EventWeatherCondition text,
    EventEnvironmentalCondition text,
    EventWorkZone text,
    EventReportingAgencyType text,
    EventReportingAgencyName text,
    EventReportingCaseNumber text,
    EventFormType text,
    PropertyDamageAmount text,
    SHSP_Distracted text,
    SHSP_Teen text,
    SHSP_Aging text,
    SHSP_Impaired text,
    HitTree text,
    Bridge text,
    SeverityFactor text,
    RoadSurfaceCondition text,
    Driver1CCause text,
    NodeDD_X text,
    NodeDD_Y text,
    WrongWay text,
    Guardrail text,
    Fire_Explosion text,
    Water_Immersion text,
    Signalized text,
    Interstate text,
    SHSP_Commercial text,
    SHSP_NoRestraint text,
    TotalSeriousInjuries text,
    NightTime text,
    RoadSystemType text,
    OnOffSystem text,
    CrashType text,
    Driver1Age text,
    Driver1Sex text,
    Driver1Injury text,
    Driver1CCauseSub text,
    Driver1Condition text,
    Driver1VisionObstruct text,
    Driver1Distraction text,
    Driver1AlcoholUse text,
    Driver1DrugUse text,
    Driver1Restraint text,
    Driver1SafetyEquip text,
    Driver2Age text,
    Driver2Sex text,
    Driver2Injury text,
    Driver2CCause text,
    Driver2CCauseSub text,
    Driver2Condition text,
    Driver2VisionObstruct text,
    Driver2Distraction text,
    Driver2AlcoholUse text,
    Driver2DrugUse text,
    Driver2Restraint text,
    Driver2SafetyEquip text,
    NonMotorist1Age text,
    NonMotorist1Sex text,
    NonMotorist1Injury text,
    NonMotorist1Desc text,
    NonMotorist1Location text,
    NonMotorist1Action text,
    NonMotorist1Cause text,
    NonMotorist1CauseSub text,
    NonMotorist1AlcoholUse text,
    NonMotorist1DrugUse text,
    NonMotorist1SafetyEquip text,
    NonMotorist2Age text,
    NonMotorist2Sex text,
    NonMotorist2Injury text,
    NonMotorist2Desc text,
    NonMotorist2Location text,
    NonMotorist2Action text,
    NonMotorist2Cause text,
    NonMotorist2CauseSub text,
    NonMotorist2AlcoholUse text,
    NonMotorist2DrugUse text,
    NonMotorist2SafetyEquip text,
    TotalIncapInjuries text,
    TotalNonIncapInjuries text,
    TotalPossibleInjuries text,
    Vehicle1Direction text,
    Vehicle1Movement text,
    Vehicle1Type text
)
WITH (
    OIDS = FALSE
)

TABLESPACE pg_default;

ALTER TABLE public.crash OWNER to postgres;

ALTER TABLE crash
ALTER COLUMN HSMV TYPE integer USING cast(case when HSMV = 'null' then null else HSMV end as integer),
ALTER COLUMN EventCrashDate TYPE bigint USING cast(case when EventCrashDate = 'null' then null else EventCrashDate end as bigint),
ALTER COLUMN EventDD_X TYPE double precision USING cast(case when EventDD_X = 'null' then null else EventDD_X end as double precision),
ALTER COLUMN EventDD_Y TYPE double precision USING cast(case when EventDD_Y = 'null' then null else EventDD_Y end as double precision),
ALTER COLUMN TotalFatalities TYPE integer USING cast(case when TotalFatalities = 'null' then null else TotalFatalities end as integer),
ALTER COLUMN TotalInjuries TYPE integer USING cast(case when TotalInjuries = 'null' then null else TotalInjuries end as integer),
ALTER COLUMN Fatal TYPE integer USING cast(case when Fatal = 'null' then null else Fatal end as integer),
ALTER COLUMN Incapacitating TYPE integer USING cast(case when Incapacitating = 'null' then null else Incapacitating end as integer),
ALTER COLUMN NonIncapacitating TYPE integer USING cast(case when NonIncapacitating = 'null' then null else NonIncapacitating end as integer),
ALTER COLUMN PossibleInjury TYPE integer USING cast(case when PossibleInjury = 'null' then null else PossibleInjury end as integer),
ALTER COLUMN Pedestrian TYPE integer USING cast(case when Pedestrian = 'null' then null else Pedestrian end as integer),
ALTER COLUMN Bike TYPE integer USING cast(case when Bike = 'null' then null else Bike end as integer),
ALTER COLUMN Intoxication TYPE integer USING cast(case when Intoxication = 'null' then null else Intoxication end as integer),
ALTER COLUMN Speeding TYPE integer USING cast(case when Speeding = 'null' then null else Speeding end as integer),
ALTER COLUMN DisregardControl TYPE integer USING cast(case when DisregardControl = 'null' then null else DisregardControl end as integer),
ALTER COLUMN WorkZone TYPE integer USING cast(case when WorkZone = 'null' then null else WorkZone end as integer),
ALTER COLUMN NoLighting TYPE integer USING cast(case when NoLighting = 'null' then null else NoLighting end as integer),
ALTER COLUMN SHSP_VulnerableUser TYPE integer USING cast(case when SHSP_VulnerableUser = 'null' then null else SHSP_VulnerableUser end as integer),
ALTER COLUMN SHSP_AgrDriving TYPE integer USING cast(case when SHSP_AgrDriving = 'null' then null else SHSP_AgrDriving end as integer),
ALTER COLUMN SHSP_LaneDeparture TYPE integer USING cast(case when SHSP_LaneDeparture = 'null' then null else SHSP_LaneDeparture end as integer),
ALTER COLUMN SHSP_Intersetion TYPE integer USING cast(case when SHSP_Intersetion = 'null' then null else SHSP_Intersetion end as integer),
ALTER COLUMN Angle TYPE integer USING cast(case when Angle = 'null' then null else Angle end as integer),
ALTER COLUMN RearEnd TYPE integer USING cast(case when RearEnd = 'null' then null else RearEnd end as integer),
ALTER COLUMN LeftTurn TYPE integer USING cast(case when LeftTurn = 'null' then null else LeftTurn end as integer),
ALTER COLUMN RightTurn TYPE integer USING cast(case when RightTurn = 'null' then null else RightTurn end as integer),
ALTER COLUMN HeadOn TYPE integer USING cast(case when HeadOn = 'null' then null else HeadOn end as integer),
ALTER COLUMN Sideswipe TYPE integer USING cast(case when Sideswipe = 'null' then null else Sideswipe end as integer),
ALTER COLUMN SignalizeStop TYPE integer USING cast(case when SignalizeStop = 'null' then null else SignalizeStop end as integer),
ALTER COLUMN CloseMedian TYPE integer USING cast(case when CloseMedian = 'null' then null else CloseMedian end as integer),
ALTER COLUMN ProtectetLeftTurn TYPE integer USING cast(case when ProtectetLeftTurn = 'null' then null else ProtectetLeftTurn end as integer),
ALTER COLUMN AccessMgmtReview TYPE integer USING cast(case when AccessMgmtReview = 'null' then null else AccessMgmtReview end as integer),
ALTER COLUMN RoadFriction TYPE integer USING cast(case when RoadFriction = 'null' then null else RoadFriction end as integer),
ALTER COLUMN RunOffRoad TYPE integer USING cast(case when RunOffRoad = 'null' then null else RunOffRoad end as integer),
ALTER COLUMN HeavyTruck TYPE integer USING cast(case when HeavyTruck = 'null' then null else HeavyTruck end as integer),
ALTER COLUMN Prohibit_UTurns TYPE integer USING cast(case when Prohibit_UTurns = 'null' then null else Prohibit_UTurns end as integer),
ALTER COLUMN MotorCycle TYPE integer USING cast(case when MotorCycle = 'null' then null else MotorCycle end as integer),
ALTER COLUMN CuveSignage TYPE integer USING cast(case when CuveSignage = 'null' then null else CuveSignage end as integer),
ALTER COLUMN UnpavedShoulder TYPE integer USING cast(case when UnpavedShoulder = 'null' then null else UnpavedShoulder end as integer),
ALTER COLUMN NonTypicalGeometry TYPE integer USING cast(case when NonTypicalGeometry = 'null' then null else NonTypicalGeometry end as integer),
ALTER COLUMN AnimalInvolved TYPE integer USING cast(case when AnimalInvolved = 'null' then null else AnimalInvolved end as integer),
ALTER COLUMN ElectronicDistraction TYPE integer USING cast(case when ElectronicDistraction = 'null' then null else ElectronicDistraction end as integer),
ALTER COLUMN AADT TYPE integer USING cast(case when AADT = 'null' then null else AADT end as integer),
ALTER COLUMN GID TYPE integer USING cast(case when GID = 'null' then null else GID end as integer),
ALTER COLUMN EventCrashYear TYPE integer USING cast(case when EventCrashYear = 'null' then null else EventCrashYear end as integer),
ALTER COLUMN EventMP TYPE double precision USING cast(case when EventMP = 'null' then null else EventMP end as double precision),
ALTER COLUMN EventDistanceFmInt TYPE double precision USING cast(case when EventDistanceFmInt = 'null' then null else EventDistanceFmInt end as double precision),
ALTER COLUMN PropertyDamageAmount TYPE double precision USING cast(case when PropertyDamageAmount = 'null' then null else PropertyDamageAmount end as double precision),
ALTER COLUMN SeverityFactor TYPE double precision USING cast(case when SeverityFactor = 'null' then null else SeverityFactor end as double precision),
ALTER COLUMN NodeDD_X TYPE double precision USING cast(case when NodeDD_X = 'null' then null else NodeDD_X end as double precision),
ALTER COLUMN NodeDD_Y TYPE double precision USING cast(case when NodeDD_Y = 'null' then null else NodeDD_Y end as double precision),
ALTER COLUMN SHSP_Distracted TYPE integer USING cast(case when SHSP_Distracted = 'null' then null else SHSP_Distracted end as integer),
ALTER COLUMN SHSP_Teen TYPE integer USING cast(case when SHSP_Teen = 'null' then null else SHSP_Teen end as integer),
ALTER COLUMN SHSP_Aging TYPE integer USING cast(case when SHSP_Aging = 'null' then null else SHSP_Aging end as integer),
ALTER COLUMN SHSP_Impaired TYPE integer USING cast(case when SHSP_Impaired = 'null' then null else SHSP_Impaired end as integer),
ALTER COLUMN HitTree TYPE integer USING cast(case when HitTree = 'null' then null else HitTree end as integer),
ALTER COLUMN Bridge TYPE integer USING cast(case when Bridge = 'null' then null else Bridge end as integer),
ALTER COLUMN WrongWay TYPE integer USING cast(case when WrongWay = 'null' then null else WrongWay end as integer),
ALTER COLUMN Guardrail TYPE integer USING cast(case when Guardrail = 'null' then null else Guardrail end as integer),
ALTER COLUMN Fire_Explosion TYPE integer USING cast(case when Fire_Explosion = 'null' then null else Fire_Explosion end as integer),
ALTER COLUMN Water_Immersion TYPE integer USING cast(case when Water_Immersion = 'null' then null else Water_Immersion end as integer),
ALTER COLUMN Signalized TYPE integer USING cast(case when Signalized = 'null' then null else Signalized end as integer),
ALTER COLUMN Interstate TYPE integer USING cast(case when Interstate = 'null' then null else Interstate end as integer),
ALTER COLUMN SHSP_Commercial TYPE integer USING cast(case when SHSP_Commercial = 'null' then null else SHSP_Commercial end as integer),
ALTER COLUMN SHSP_NoRestraint TYPE integer USING cast(case when SHSP_NoRestraint = 'null' then null else SHSP_NoRestraint end as integer),
ALTER COLUMN TotalSeriousInjuries TYPE integer USING cast(case when TotalSeriousInjuries = 'null' then null else TotalSeriousInjuries end as integer),
ALTER COLUMN NightTime TYPE integer USING cast(case when NightTime = 'null' then null else NightTime end as integer);

ALTER TABLE crash
ADD COLUMN eventyear integer,
ADD COLUMN eventmonth integer,
ADD COLUMN eventday integer;

UPDATE crash SET
eventyear = EXTRACT(YEAR FROM timestamp 'epoch' + eventcrashdate * interval '1 ms'),
eventmonth = EXTRACT(MONTH FROM timestamp 'epoch' + eventcrashdate * interval '1 ms'),
eventday = EXTRACT(DAY FROM timestamp 'epoch' + eventcrashdate * interval '1 ms');

CREATE EXTENSION postgis;
SELECT AddGeometryColumn('crash', 'geom', 4326, 'POINT', 2);
UPDATE crash SET geom = ST_SetSRID(ST_MakePoint(EventDD_X, EventDD_Y), 4326);

CREATE INDEX ON crash USING GIST (geom);
CREATE INDEX ON crash_pinellas(eventyear);
CREATE INDEX ON crash_pinellas(highestseverity);
CREATE INDEX ON crash_pinellas(hsmv);

-- create an index for case-insensitive searches on the lookup table
CREATE INDEX ON lookup_roadway (lower(fullname));
