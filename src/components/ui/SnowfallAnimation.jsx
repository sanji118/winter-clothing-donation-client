
const SnowfallAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Snow
        color="#A8DADC"
        amount={60}
        speed={1.5}
        wind={0.5}
        size={[0.5, 3]}
        opacity={[0.3, 0.8]}
      />
    </div>
  );
};

export default SnowfallAnimation;